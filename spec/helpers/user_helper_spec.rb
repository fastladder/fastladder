require File.dirname(__FILE__) + '/../spec_helper'
require 'string_utils'
include ApplicationHelper

describe UserHelper do
  it 'should create opml item' do
    title = 'feed title'
    link = 'http://blog.fastladder.com/'
    feedlink = 'http://blog.fastladder.com/blog/rss.xml'
    feed = mock('feed')
    feed.should_receive(:title).and_return(title)
    feed.should_receive(:feedlink).and_return(feedlink)
    feed.should_receive(:link).and_return(link)
    item = mock('item')
    item.should_receive(:feed).and_return(feed)
    format_opml_item(item).should be_eql(%{<outline title="#{title.html_escape}" htmlUrl="#{link.html_escape}" type="rss" xmlUrl="#{feedlink.html_escape}" />})
  end
end
