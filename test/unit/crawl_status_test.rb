require File.dirname(__FILE__) + '/../test_helper'

class CrawlStatusTest < Test::Unit::TestCase
  fixtures :crawl_statuses, :feeds

  def setup
    @status = CrawlStatus.find(:first)
  end

  def test_feed
    assert_not_nil(@status.feed)
  end
end
