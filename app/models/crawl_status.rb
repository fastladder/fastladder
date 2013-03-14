class CrawlStatus < ActiveRecord::Base
  belongs_to :feed

  def self.fetch_crawlable_feed(options = {})
    CrawlStatus.update_all("status = #{Fastladder::Crawler::CRAWL_OK}", ['crawled_on < ?', 24.hours.ago])
    feed = nil
    CrawlStatus.transaction do
      conditions = [
        'crawl_statuses.status = ? AND feeds.subscribers_count > 0 AND (crawl_statuses.crawled_on is NULL OR crawl_statuses.crawled_on < ?)',
        Fastladder::Crawler::CRAWL_OK,
        30.minutes.ago
      ]
      if feed = Feed.find(:first, :conditions => conditions, :order => 'crawl_statuses.crawled_on', :include => :crawl_status)
        feed.crawl_status.update_attributes(:status => Fastladder::Crawler::CRAWL_NOW, :crawled_on => Time.now)
      end
    end
    feed
  end
end
