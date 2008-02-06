require "string_utils"
require "crawler"

class Feed < ActiveRecord::Base
  has_one :crawl_status
  has_one :favicon
  has_many :items
  has_many :subscriptions
  #has_many :members, :through => :subscriptions
  #has_many :folders, :through => :subscriptions
  
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
    crawl_status = self.crawl_status
    CrawlStatus.transaction do
      if crawl_status.status != Crawler::CRAWL_OK
        return
      end
      crawl_status.update_attribute(:status, Crawler::CRAWL_NOW)
    end
    begin
      Crawler::crawl(self)
    rescue => ex
      logger.error "Crawler error: #{ex}"
    ensure
      crawl_status.update_attribute(:status, Crawler::CRAWL_OK)
    end
  end
end
