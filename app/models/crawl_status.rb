# == Schema Information
#
# Table name: crawl_statuses
#
#  id               :integer          not null, primary key
#  feed_id          :integer          default(0), not null
#  status           :integer          default(1), not null
#  error_count      :integer          default(0), not null
#  error_message    :string(255)
#  http_status      :integer
#  digest           :string(255)
#  update_frequency :integer          default(0), not null
#  crawled_on       :datetime
#  created_on       :datetime         not null
#  updated_on       :datetime         not null
#

class CrawlStatus < ActiveRecord::Base
  belongs_to :feed
  attr_accessible :status, :crawled_on

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
