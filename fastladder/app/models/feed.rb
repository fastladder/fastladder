require "string_utils"
require "feed-normalizer"
require "fastladder/crawler"

class Feed < ActiveRecord::Base
  has_one :crawl_status
  has_one :favicon
  has_many :items
  has_many :subscriptions
  #has_many :members, :through => :subscriptions
  #has_many :folders, :through => :subscriptions
  
  def self.create_from_uri(uri)
    unless feed_data = FeedNormalizer::FeedNormalizer.parse(Fastladder::simple_fetch(uri))
      return nil
    end
    feed = self.create({
      :feedlink => uri.to_s,
      :link => feed_data.urls[0] || uri.to_s,
      :title => feed_data.title || feed_data.link || "",
      :description => feed_data.description || "",
    })
    feed.create_crawl_status
    feed
  end
  
  def icon
    if self.favicon
      "/icon/#{self.id}"
    else
      "/img/icon/default.png"
    end
  end
  
  def to_json(options = {})
    result = {}
    %w(title description).each do |s|
      result[s.to_sym] = (self.send(s) || "").purify_html
    end
    %w(feedlink link image).each do |s|
      result[s.to_sym] = (self.send(s) || "").purify_uri
    end

    result[:expires] = 0
    result[:subscribers_count] = self.subscribers_count
    result[:error_count] = self.crawl_status.error_count
    result.to_json
  end

  def subscribed(member)
    member.subscribed(self)
  end

  def update_subscribers_count
    logger.warn "subscribers: #{self.subscribers_count}"
    self.update_attribute(:subscribers_count, self.subscriptions.size)
  end

  def crawl
    return if crawl_status.status != Fastladder::Crawler::CRAWL_OK
    crawl_status.update_attribute(:status, Fastladder::Crawler::CRAWL_NOW)
    begin
      crawler = Fastladder::Crawler.new(logger)
      crawler.crawl(self)
    rescue
      logger.error "Crawler error: #{$!}"
    ensure
      crawl_status.update_attribute(:status, Crawler::CRAWL_OK)
    end
  end
end
