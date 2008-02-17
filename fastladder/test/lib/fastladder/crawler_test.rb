require File.dirname(__FILE__) + '/../../test_helper'
require 'fastladder'

class CrawlerTest < Test::Unit::TestCase
  fixtures :feeds, :crawl_statuses, :favicons

  def setup
    logger = Logger.new(STDOUT)
    @crawler = Fastladder::Crawler.new(logger)

    @feed = feeds(:fastladder_blog)
    @feed.modified_on = 1.years.ago
    @feed.save!
    @last_modified = @feed.modified_on
  end

  def teardown
    Item.destroy_all
  end

  def test_crawl
    result = nil
    assert_nothing_raised { result = @crawler.crawl(@feed) }
    assert_not_nil(result, 'No result returened')
    assert(!result[:error], 'Expected nothing error occured, but returned "Error occured"')
    assert_match(/([\d]+) new items, ([\d]+) updated items/, result[:message])
    assert_equal(200, result[:response_code])
    assert_not_equal(@last_modified, @feed.modified_on, 'Feed is modified, but feed is not updated')
    #assert(@last_crawled < @status.crawled_on, 'Crawl status is not updated')
    assert(Item.count > 0, 'No Item added')
  end

  def test_crawl_when_not_modified
    @last_modified = Time.now
    @feed.modified_on = @last_modified
    @feed.save!
    last_updated = @feed.updated_on.dup
    result = @crawler.crawl(@feed)

    assert_equal(last_updated, @feed.updated_on, 'Feed is not modified, but feed is updated')
    assert_equal(304, result[:response_code])
    #assert(@last_crawled < @status.crawled_on, 'Crawl status is not updated')
  end
end
