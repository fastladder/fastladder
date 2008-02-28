require File.dirname(__FILE__) + '/../spec_helper'
require 'string_utils'
include ApplicationHelper

describe SubscribeHelper do
  it 'should create users_link' do
    feed_url = 'http://blog.fastladder.com/blog/rss.xml'
    feed = mock('Feed')
    feed.should_receive(:feedlink).and_return(feed_url)
    feed.should_receive(:subscribers_count).twice.and_return(10)
    users_link(feed).should be_eql("(<a href=\"/about/#{feed_url.html_escape}\">10 users</a>)")

    unsubscribed_feed = mock('Unsubscribed')
    unsubscribed_feed.should_receive(:subscribers_count).twice.and_return(0)
    users_link(unsubscribed_feed).should be_eql('(0 user)')
  end
end
