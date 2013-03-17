# == Schema Information
#
# Table name: feeds
#
#  id                :integer          not null, primary key
#  feedlink          :string(255)      not null
#  link              :string(255)      not null
#  title             :text             default(""), not null
#  description       :text             default(""), not null
#  subscribers_count :integer          default(0), not null
#  image             :string(255)
#  icon              :string(255)
#  modified_on       :datetime
#  created_on        :datetime         not null
#  updated_on        :datetime         not null

require 'spec_helper'

describe Feed do
  describe ".initialize_from_uri" do
    include_context(:use_stub_feed)
    subject { Feed.initialize_from_uri("https://github.com/fastladder/fastladder/commits/master.atom") }
    its(:title) { should == "Recent Commits to fastladder:master" }
    its(:feedlink) { should == "https://github.com/fastladder/fastladder/commits/master.atom" }
    its(:link) { should == "https://github.com/fastladder/fastladder/commits/master" }
    its(:description) { should == "" }
  end

  describe ".create_from_uri" do
    include_context(:use_stub_feed)
    it "create feed" do
      expect {
        Feed.create_from_uri("https://github.com/fastladder/fastladder/commits/master.atom")
      }.to change{ Feed.count }.from(0).to(1)
    end
    it "create crawl_status" do
      expect {
        Feed.create_from_uri("https://github.com/fastladder/fastladder/commits/master.atom")
      }.to change{ CrawlStatus.count }.from(0).to(1)
    end
  end

  describe "fetch favicon" do
    before do
      favicon = open(File.expand_path(File.join(File.dirname(__FILE__), '..', 'fixtures', 'favicon.ico'))).read
      stub_request(:any, /.*/).to_return(content_type: 'image/vnd.microsoft.icon', body: favicon)
    end

    it "favicon.ico store as PNG" do
      feed = Factory(:feed)
      feed.fetch_favicon!
      feed.favicon.image.start_with?("\x89PNG\r\n".force_encoding('ascii-8bit')).should be_true
    end

    it "complex favicon url detection" do
      # <link rel="shortcut icon" href="http://cdn.image.st-hatena.com/image/favicon/6b9137a793a9f489e05eda5e4ad702443965775e/version=1/http%3A%2F%2Fcdn.mogile.archive.st-hatena.com%2Fv1%2Fimage%2Fbike-o%2F171679000384244621.gif">
      feed = Factory(:feed, :link => "http://bike-o.hatenablog.com/", :feedlink => "http://bike-o.hatenablog.com/feed")
      feed.fetch_favicon!
      feed.favicon.image.start_with?("\x89PNG\r\n".force_encoding('ascii-8bit')).should be_true
    end
  end
end
