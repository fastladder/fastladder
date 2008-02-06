require "uri"
require "net/https"
require "feed-normalizer"
require "hpricot"
require "digest/sha1"
require "tempfile"
begin
  require "image_utils"
rescue LoadError
end

module Crawler
  Version = "0.0.1"

  ITEMS_LIMIT = 500
  CRAWL_OK = 1
  CRAWL_NOW = 10

  def crawl(obj)
    feed, crawl_status = feed_and_crawl_status(obj)
    feedlink = feed.feedlink
    modified_on = feed.modified_on
    response = nil
    result = {
      :message => "",
      :error => 0,
    }
    5.times do |i|
      begin
        logger.info "fetch: #{feedlink}"
        response = fetch(feedlink, :modified_on => modified_on, :subscribers => feed.subscribers_count)
      rescue Net::ProtocolError, Timeout::Error, OpenSSL::OpenSSLError => ex
        result[:message] = %!fetch failed: #{ex.backtrace.join("\n")}!
        result[:error] = 1
        return result
      end
      logger.info "HTTP status: [#{response.code}] #{feedlink}"
      if crawled_on = crawl_status.crawled_on and crawled_on.to_i > 0 and i == 0
        logger.info "interval: [#{Time.now.to_i - crawled_on.to_time.to_i}s] #{feedlink}"
      end
      crawl_status.crawled_on = Time.now
      case response
      when Net::HTTPNotModified
        # reset_error
        break
      when Net::HTTPSuccess
        ret = update(feed, response)
        result[:message] = "#{ret[:new_items]} new items, #{ret[:updated_items]} updated items"
        # reset_error
        break
      when Net::HTTPClientError, Net::HTTPServerError
        result[:message] = "Error: #{response.code} #{response.message}"
        result[:error] = 1
        # http_status = ...
        # log_error
        break
      #when Net::HTTPUnauthorized
      #  ...
      #when Net::HTTPMovedPermanently
      #  if crawl_status.http_status == 301  # Moved Permanently
      #    if crawl_status.response_changed_on < 1.week.ago
      #      feed.feedlink = feedlink
      #      modified_on = nil
      #    end
      #  end
      when Net::HTTPRedirection
        logger.info "Redirect: #{feedlink} => #{response["location"]}"
        feedlink = response["location"]
        modified_on = nil
      else
        # HTTPUnknownResponse, HTTPInformation
        result[:message] = "Error: #{response.code} #{response.message}"
        result[:error] = 1
        break
      end
    end
    http_status = response.code.to_i
    if crawl_status.http_status != http_status
      crawl_status.http_status = http_status
      #crawl_status.http_status_changed_on = Time.now
    end
    feed.save
    crawl_status.save
    result
  end

  def feed_and_crawl_status(obj)
    case obj
    when CrawlStatus
      crawl_status = obj
      feed = obj.feed
    when Feed
      feed = obj
      crawl_status = obj.crawl_status
    else
      raise "Crawler#crawl expects an instance of Feed or CrawlStatus."
    end
    return feed, crawl_status
  end

  def fetch(link, options = {})
    uri = link.is_a?(URI) ? link : URI(link)
    http = Net::HTTP.new(uri.host, uri.port)
    case uri.scheme
    when "http"
    when "https"
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    else
      raise "unknown scheme: #{link.to_s}"
    end
    http.open_timeout = options[:open_timeout] || 60
    http.read_timeout = options[:read_timeout] || 60
    request = Net::HTTP::Get.new(uri.request_uri)
    if subscribers = options[:subscribers]
      subscribers_info = subscribers ? "#{subscribers} #{subscribers == 1 ? "subscriber" : "subscribers"}" : ""
    end
    if ENV["RAILS_ENV"] == "production"
      request["User-Agent"] = options[:user_agent] || "Fastladder FeedFetcher/#{Version} (http://fastladder.org/; #{subscribers_info})"
    else
      request["User-Agent"] = options[:user_agent] || "Mozilla/5.0 (Macintosh; U; Intel Mac OS X; ja-jp) AppleWebKit/523.12 (KHTML, like Gecko) Version/3.0.4 Safari/523.12"
    end
    request["Accept"] = "text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5"

    if modified_on = options[:modified_on]
      request["If-Modified-Since"] = modified_on
    end
    if options[:user] or uri.user
      request.basic_auth(options[:user] || uri.user, options[:password] || uri.password || "")
    end
    http.request(request)
  end

  def simple_fetch(link, options = {})
    begin
      if (response = fetch(link, options)).is_a? Net::HTTPSuccess
        return response.body
      end
    rescue Net::ProtocolError, Timeout::Error, OpenSSL::OpenSSLError => ex
    end
    nil
  end

  def update(feed, response)
    result = {
      :new_items => 0,
      :updated_items => 0,
      :error => nil,
    }
    unless parsed = FeedNormalizer::FeedNormalizer.parse(response.body)
      result[:error] = "Cannot parse feed"
      return result
    end
    logger.info "parsed: [#{parsed.items.size} items] #{feed.feedlink}"
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
      logger.info "too large feed: #{feed.feedlink}(#{feed.items.size})"
      items = items[0, ITEMS_LIMIT]
    end
    items = items.reject { |item|
      feed.items.exists?(["link = ? and digest = ?", item.link, item.digest])
    }
    if items.size > ITEMS_LIMIT / 2
      logger.info "delete all items: #{feed.feedlink}"
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
      elsif last_modified = response["last-modified"]
        modified_on = Time.rfc2822(last_modified)
      end
      feed.modified_on = modified_on
      Subscription.update_all("has_unread = 1", ["feed_id = ?", feed.id])
    end
    feed.title = parsed.title
    feed.link = parsed.url
    feed.description = parsed.description || ""
    feed.image = nil
    if favicon = fetch_favicon(feed)
      Favicon.find_or_create_by_feed_id(feed.id).update_attribute(:image, favicon)
    end
    result
  end

  def fetch_favicon(feed)
    uri_list = []
    feedlink_uri = URI(feed.feedlink)
    logger.info "fetch: #{feedlink_uri.to_s}"
    if body = simple_fetch(feedlink_uri)
      doc = Hpricot(body)
      if link_rel = doc.at("//link[@rel='shortcut icon']") and path = link_rel["href"]
        uri_list << feedlink_uri + path
      end
    end
    uri_list << feedlink_uri + "/favicon.ico"
    uri_list << URI(feed.link) + "/favicon.ico"
    uri_list.uniq.each do |uri|
      logger.info "fetch: #{uri.to_s}"
      unless favicon = simple_fetch(uri)
        next
      end
      begin
        return ImageUtils::ico2png(favicon)
      rescue => ex
        logger.error "ico2png error: #{ex}"
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

  GETA = [12307].pack("U")
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

  module_function :fetch, :simple_fetch
end
