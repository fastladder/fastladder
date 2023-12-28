require "fastladder"
require "tempfile"
require "logger"
begin
  require "image_utils"
rescue LoadError
end

module Fastladder
  class Crawler
    ITEMS_LIMIT = 500
    REDIRECT_LIMIT = 5
    CRAWL_OK = 1
    CRAWL_NOW = 10
    GETA = [12307].pack("U")

    def self.start(options = {})
      logger = options[:logger]

      unless logger
        target = options[:log_file] || STDOUT
        logger = Logger.new(target)
        logger.level = options[:log_level] || Logger::INFO
      end

      logger.warn '=> Booting FeedFetcher...'
      self.new(logger).run
    end

    def initialize(logger)
      @logger = logger
    end

    def run
      @interval = 0
      finish = false
      until finish
        finish = run_loop
      end
    end

    def crawl(feed)
      response = nil
      result = {
        message: '',
        error: false,
        response_code: nil,
      }
      REDIRECT_LIMIT.times do
        begin
          @logger.info "fetch: #{feed.feedlink}"
          response = Fastladder.fetch(feed.feedlink, modified_on: feed.modified_on)
        end
        @logger.info "HTTP status: [#{response.code}] #{feed.feedlink}"
        case response
        when Net::HTTPNotModified
          break
        when Net::HTTPSuccess
          ret = update(feed, response)
          result[:message] = "#{ret[:new_items]} new items, #{ret[:updated_items]} updated items"
          break
        when Net::HTTPClientError, Net::HTTPServerError
          result[:message] = "Error: #{response.code} #{response.message}"
          result[:error] = true
          break
        # when Net::HTTPUnauthorized
        #   ...
        #   break
        # when Net::HTTPMovedPermanently
        #   if crawl_status.http_status == 301  # Moved Permanently
        #     if crawl_status.response_changed_on < 1.week.ago
        #       feed.feedlink = feedlink
        #       modified_on = nil
        #     end
        #   end
        #   break
        when Net::HTTPRedirection
          @logger.info "Redirect: #{feed.feedlink} => #{response["location"]}"
          feed.feedlink = URI.join(feed.feedlink, response["location"])
          feed.modified_on = nil
          feed.save
        else
          # HTTPUnknownResponse, HTTPInformation
          result[:message] = "Error: #{response.code} #{response.message}"
          result[:error] = true
          break
        end
      end
      result[:response_code] = response.code.to_i
      result
    end

    private

    def run_loop
      begin
        run_body
      rescue TimeoutError
        @logger.error "Time out: #{$!}"
      rescue SignalException
        @logger.warn "\n=> #{$!.message} trapped. Terminating..."
        return true
      rescue Exception
        @logger.error %!Crawler error: #{$!.message}\n#{$!.backtrace.join("\n")}!
      ensure
        if @crawl_status
          @crawl_status.status = CRAWL_OK
          @crawl_status.save
        end
      end
      false
    end

    def run_body
      @logger.info "sleep: #{@interval}s"
      sleep @interval
      if feed = CrawlStatus.fetch_crawlable_feed
        @interval = 0
        result = crawl(feed)
        if result[:error]
          @logger.info "error: #{result[:message]}"
        else
          @crawl_status = feed.crawl_status
          @crawl_status.http_status = result[:response_code]
          @logger.info "success: #{result[:message]}"
        end
      else
        @interval = @interval > 60 ? 60 : @interval + 1
      end
    end

    def update(feed, source)
      result = {
        new_items: 0,
        updated_items: 0,
        error: nil
      }
      unless parsed = Feedjira::Feed.parse(source.body)
        result[:error] = 'Cannot parse feed'
        return result
      end

      items = build_items(feed, parsed)

      items = cut_off(feed, items)
      items = reject_duplicated(feed, items)
      delete_old_items_if_new_items_are_many(feed, items)
      update_or_insert_items_to_feed(feed, items, result)
      update_unread_status(feed, result)
      update_feed_infomation(feed, parsed)
      feed.save

      feed.fetch_favicon!
      GC.start

      result
    end

    def build_items(feed, parsed)
      @logger.info "parsed: [#{parsed.entries.size} items] #{feed.feedlink}"
      parsed.entries.map { |item|
        new_item = Item.new({
                             feed_id: feed.id,
                             link: item.url || "",
                             guid: item.id,
                             title: item.title || "",
                             body: fixup_relative_links(feed, item.content || item.summary),
                             author: item.author,
                             category: item.try(:categories).try!(:first),
                             enclosure: nil,
                             enclosure_type: nil,
                             stored_on: Time.now,
                             modified_on: item.published ? item.published.to_datetime : nil,
                            })
        new_item.create_digest
        new_item
      }
    end

    def fixup_relative_links(feed, body)
      doc = Nokogiri::HTML.fragment(body)
      links = doc.css('a[href]')
      if links.empty?
        body
      else
        links.each do |link|
          begin
            link['href'] = Addressable::URI.join(feed.feedlink, link['href']).normalize.to_s
          rescue Addressable::URI::InvalidURIError
            @logger.info "Invalid URL in link: [#{link['href']}] #{feed.feedlink}"
            next
          end
        end
        doc.to_html
      end
    end

    def cut_off(feed, items)
      return items unless items.size > ITEMS_LIMIT
      @logger.info "too large feed: #{feed.feedlink}(#{feed.items.size})"
      items[0, ITEMS_LIMIT]
    end

    def reject_duplicated(feed, items)
      items.uniq { |item| item.guid }.reject { |item| feed.items.exists?(["guid = ? and digest = ?", item.guid, item.digest]) }
    end

    def new_items_count(feed, items)
      items.reject { |item| feed.items.exists?(["link = ? and digest = ?", item.link, item.digest]) }.size
    end

    def delete_old_items_if_new_items_are_many(feed, items)
      new_items_size = new_items_count(feed, items)
      return unless new_items_size > ITEMS_LIMIT / 2
      @logger.info "delete all items: #{feed.feedlink}"
      Item.where(feed_id: feed.id).delete_all
    end

    def update_or_insert_items_to_feed(feed, items, result)
      items.reverse_each do |item|
        if old_item = feed.items.find_by(guid: item.guid)
          old_item.increment(:version)
          unless almost_same(old_item.title, item.title) and almost_same((old_item.body || "").html2text, (item.body || "").html2text)
            old_item.stored_on = item.stored_on
            result[:updated_items] += 1
          end
          update_columns = %w(link title body author category enclosure enclosure_type digest modified_on)
          old_item.attributes = item.attributes.select{ |column, value| update_columns.include? column }
          old_item.save
        else
          feed.items << item
          result[:new_items] += 1
        end
      end
    end

    def update_unread_status(feed, result)
      return unless result[:updated_items] + result[:new_items] > 0

      last_item = feed.items.recent.first
      feed.modified_on = last_item.created_on

      Subscription.where(feed_id: feed.id).update_all(has_unread: true)
    end

    def update_feed_infomation(feed, parsed)
      feed.title = parsed.title
      feed.link = parsed.url
      feed.description = parsed.description || ""
    end

    def almost_same(str1, str2)
      if str1 == str2
        return true
      end
      chars1 = str1.split(//)
      chars2 = str2.split(//)
      if chars1.length != chars2.length
        return false
      end
      # count differences
      [chars1, chars2].transpose.find_all { |pair|
        !pair.include?(GETA) and pair[0] != pair[1]
      }.size <= 5
    end

  end
end
