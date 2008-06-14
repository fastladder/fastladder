require File.dirname(__FILE__) + '/../spec_helper'
require 'feed-normalizer'

describe Feed, 'when register from feed uri' do
  before :each do
    Feed.destroy_all
  end

  before :each do
    @feed_uri = 'http://blog.fastladder.com/blog/rss.xml'
    @contents = 'feed'
    Fastladder.should_receive(:simple_fetch).with(@feed_uri).and_return(@contents)
  end

  before :each do
    @feed_data = mock('Feed Data')
    @blog_uri = 'http://blog.fastladder.com'
    @blog_title = 'Fastladder Blog'
    @description = 'Feed Description'
    @feed_data.should_receive(:urls).and_return([@blog_uri])
    @feed_data.should_receive(:title).and_return(@blog_title)
    @feed_data.should_receive(:description).and_return(@description)
    FeedNormalizer::FeedNormalizer.should_receive(:parse).with(@contents).and_return(@feed_data)
  end

  after :each do
    Feed.destroy_all
  end

  it 'should create new Feed from uri' do
    @feed = Feed.create_from_uri(@feed_uri)
    @feed.should_not be_nil
    @feed.should be_kind_of(Feed)
    @feed.title.should be_eql(@blog_title)
    @feed.link.should be_eql(@blog_uri)
    @feed.feedlink.should be_eql(@feed_uri)
    @feed.description.should be_eql(@description)
    @feed.crawl_status.should_not be_nil
  end
end

describe Feed, 'when register from invalid feed uri' do
  before :each do
    @feed_uri = 'http://feed.example.com/not/found.xml'
    Fastladder.should_receive(:simple_fetch).with(@feed_uri).and_return(nil)
  end

  it 'should not create new Feed' do
    Feed.create_from_uri(@feed_uri).should be_nil
  end
end

describe Feed, 'when have own favicon' do
  fixtures :feeds, :favicons

  before :each do
    @feed = feeds(:fastladder_blog)
    @favicon = favicons(:fastladder_blog)
  end

  it 'should return favicon path' do
    @feed.icon.should be_eql("/icon/#{@favicon.id}")
  end
end

describe Feed, 'when have no favicon' do
  fixtures :feeds

  before :each do
    Favicon.delete_all
  end

  before :each do
    @feed = feeds(:fastladder_blog)
  end

  it 'should return default icon path' do
    @feed.icon.should be_eql('/img/icon/default.png')
  end
end

describe Feed, 'when subscribed by a member' do
  fixtures :feeds

  before :each do
    @feed = feeds(:fastladder_blog)
  end

  before :each do
    @member = mock('Member')
    @member.should_receive(:subscribed).with(@feed).and_return(@feed)
  end

  it 'should be subscribed' do
    # ???
    @feed.subscribed(@member).should be_eql(@feed)
  end
end

describe Feed, 'when update subscribers count' do
  fixtures :feeds

  before :each do
    @feed = feeds(:fastladder_blog)
  end

  before :each do 
    @new_count = 2
    @subscriptions = mock('Subscriptions')
    @subscriptions.should_receive(:size).at_least(:once).and_return(@new_count)
    @feed.should_receive(:subscriptions).at_least(:once).and_return(@subscriptions)
  end

  it 'should updated count by number of subscritions' do
    @old_count = @feed.subscribers_count
    @feed.update_subscribers_count
    @feed.subscribers_count.should be_equal(@new_count)
    @feed.subscribers_count.should_not be_equal(@old_count)
  end
end

describe Feed, 'when execute crawl' do
  fixtures :feeds

  before :each do
    @feed = feeds(:fastladder_blog)
  end

  it 'should fetch feed and update item if feed is crawlable' do
    @crawl_status = mock('CrawlStatus')
    @crawl_status.should_receive(:status).and_return(Fastladder::Crawler::CRAWL_OK)
    @crawl_status.should_receive(:update_attribute).with(:status, Fastladder::Crawler::CRAWL_NOW)
    @crawl_status.should_receive(:update_attribute).with(:status, Fastladder::Crawler::CRAWL_OK)
    @feed.should_receive(:crawl_status).at_least(3).times.and_return(@crawl_status)
    @feed.crawl
  end

  it 'should not crawl if feed is not crawlable' do
    @crawl_status = mock('CrawlStatus')
    @crawl_status.should_receive(:status).and_return(Fastladder::Crawler::CRAWL_NOW)
    @feed.should_receive(:crawl_status).once.and_return(@crawl_status)
    @feed.crawl
  end
end
