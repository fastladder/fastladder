require "fastladder"
require "feed-normalizer"
require "hpricot"
require "digest/sha1"
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
      interval = 0
      finish = false
      until finish
        begin
          @logger.info "sleep: #{interval}s"
          sleep interval
          if feed = fetch_crawlable_feed
            interval = 0
            result = crawl(feed)
            if result[:error]
              @logger.info "error: #{result[:message]}"
            else
              crawl_status = feed.crawl_status
              crawl_status.http_status = result[:response_code]
              @logger.info "success: #{result[:message]}"
            end
          else
            interval = interval > 60 ? 60 : interval + 1
          end
        rescue TimeoutError
          @logger.error "Time out: #{$!}"
        rescue Interrupt
          @logger.warn "\n=> #{$!.message} trapped. Terminating..."
          finish = true
        rescue Exception
          @logger.error %!Crawler error: #{$!.message}\n#{$!.backtrace.join("\n")}!
        ensure
          if crawl_status
            crawl_status.status = CRAWL_OK
            crawl_status.save
          end
        end
      end
    end

    def crawl(feed)
      response = nil
      result = {
        :message => '',
        :error => false,
        :response_code => nil,
      }
      REDIRECT_LIMIT.times do
        begin 
          @logger.info "fetch: #{feed.feedlink}"
          response = Fastladder::fetch(feed.feedlink, :modified_on => feed.modified_on)
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
=begin
        when Net::HTTPUnauthorized
          ...
          break
        when Net::HTTPMovedPermanently
          if crawl_status.http_status == 301  # Moved Permanently
            if crawl_status.response_changed_on < 1.week.ago
              feed.feedlink = feedlink
              modified_on = nil
            end
          end
          break
=end
        when Net::HTTPRedirection
          @logger.info "Redirect: #{feedlink} => #{response["location"]}"
          feed.feedlink = response["location"]
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
    def update(feed, source)
      result = {
        :new_items => 0,
        :updated_items => 0,
        :error => nil
      }
      unless parsed = FeedNormalizer::FeedNormalizer.parse(source.body)
        result[:error] = 'Cannot parse feed'
        return result
      end
      @logger.info "parsed: [#{parsed.items.size} items] #{feed.feedlink}"
      items = parsed.items.map { |item|
        Item.new({
          :feed_id => feed.id,
          :link => item.urls.first || "",
          :title => item.title || "",
          :body => item.content,
          :author => item.authors.first,
          :category => item.categories.first,
          :enclosure => nil,
          :enclosure_type => nil,
          :digest => item_digest(item),
          :stored_on => Time.now,
          :modified_on => item.date_published ? item.date_published.to_datetime : nil,
        })
      }

      if items.size > ITEMS_LIMIT
        @logger.info "too large feed: #{feed.feedlink}(#{feed.items.size})"
        items = items[0, ITEMS_LIMIT]
      end

      items = items.reject { |item| feed.items.exists?(["link = ? and digest = ?", item.link, item.digest]) }

      if items.size > ITEMS_LIMIT / 2
        @logger.info "delete all items: #{feed.feedlink}"
        Items.delete_all(["feed_id = ?", feed.id])
      end

      items.reverse_each do |item|
        if old_item = feed.items.find_by_link(item.link)
          old_item.increment(:version)
          unless almost_same(old_item.title, item.title) and almost_same((old_item.body || "").html2text, (item.body || "").html2text)
            old_item.stored_on = item.stored_on
            result[:updated_items] += 1
          end
          %w(title body author category enclosure enclosure_type digest stored_on modified_on).each do |col|
            old_item.send("#{col}=", item.send(col))
          end
          old_item.save
        else
          feed.items << item
          result[:new_items] += 1
        end
      end

      if result[:updated_items] + result[:new_items] > 0
        modified_on = Time.now
        if last_item = feed.items.find(:first, :order => "created_on DESC")
          modified_on = last_item.created_on
        elsif last_modified = sourece["last-modified"]
          @logger.info source['last-modified']
          modified_on = Time.rfc2822(last_modified)
        end
        feed.modified_on = modified_on
        Subscription.update_all(["has_unread = ?", true], ["feed_id = ?", feed.id])
      end

      [
        [:title, parsed.title],
        [:link, parsed.url],
        [:description, parsed.description || ""],
      ].each do |column, value|
        feed.__send__("#{column}=", value) if feed.__send__(column) != value
      end
      feed.save

      if image = fetch_favicon(feed, source)
        favicon = feed.favicon
        favicon ||= Favicon.new(:feed => feed)
        favicon.image = image if favicon.image != image
        favicon.save
        GC.start
      end

      result
    end

    def fetch_favicon(feed, source)
      uri_list = []
      feedlink_uri = URI.parse(feed.feedlink)
      if source
        doc = Hpricot(source.body)
        if link_rel = doc.at("//link[@rel='shortcut icon']") and path = link_rel["href"]
          uri_list << feedlink_uri + path
        end
      end
      uri_list << feedlink_uri + "/favicon.ico"
      uri_list << URI.parse(feed.link) + "/favicon.ico"
      @logger.info uri_list
      uri_list.uniq.each do |uri|
        @logger.info "fetch: #{uri.to_s}"
        next unless favicon = Fastladder::simple_fetch(uri)
        begin
          return ImageUtils::ico2png(favicon)
        rescue
          @logger.error "ico2png error: #{$!.message}"
        end
      end
      nil
    end

    def item_digest(item)
      str = "#{item.title}#{item.content}"
      str = str.gsub(%r{<br clear="all"\s*/>\s*<a href="http://rss\.rssad\.jp/(.*?)</a>\s*<br\s*/>}im, "")
      str = str.gsub(/\s+/, "")
      Digest::SHA1.hexdigest(str)
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

    def fetch_crawlable_feed(options = {})
      CrawlStatus.update_all("status = #{CRAWL_OK}", ['crawled_on < ?', 24.hours.ago])
      feed = nil
      CrawlStatus.transaction do
        conditions = [
          'crawl_statuses.status = ? AND feeds.subscribers_count > 0 AND (crawl_statuses.crawled_on is NULL OR crawl_statuses.crawled_on < ?)',
          CRAWL_OK,
          30.minutes.ago
        ]
        if feed = Feed.find(:first, :conditions => conditions, :order => 'crawl_statuses.crawled_on', :include => :crawl_status)
          feed.crawl_status.update_attributes(:status => CRAWL_NOW, :crawled_on => Time.now)
        end
      end
      feed
    end
  end
end
