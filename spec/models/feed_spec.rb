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
    let(:feed) { FactoryGirl.create(:feed) }
    before do
      favicon = open(File.expand_path(File.join(File.dirname(__FILE__), '..', 'fixtures', 'favicon.ico'))).read
      stub_request(:any, /.*/).to_return(content_type: 'image/vnd.microsoft.icon', body: favicon)
    end

    it "favicon.ico store as PNG" do
      feed.fetch_favicon!
      feed.favicon.image.start_with?("\x89PNG\r\n".force_encoding('ascii-8bit')).should be_true
    end

    it "complex favicon url detection" do
      feed.fetch_favicon!
      feed.favicon.image.start_with?("\x89PNG\r\n".force_encoding('ascii-8bit')).should be_true
    end

    it 'logs errors and does `next` when favicon.ico is not valid data' do
      MiniMagick::Image.should_receive(:open).at_least(:once).and_raise(MiniMagick::Error)
      Rails.logger.should_receive(:error).at_least(:once)
      feed.fetch_favicon!
    end
  end

  describe '.crawlable' do
    context "crawl_status" do
      before {
        @ok_feed = FactoryGirl.create(:crawl_ok_feed)
        @ng_feed = FactoryGirl.create(:crawl_ok_feed, crawl_status: FactoryGirl.create(:crawl_status, status: Fastladder::Crawler::CRAWL_NOW))
      }
      it { expect(Feed.crawlable).to include(@ok_feed)}
      it { expect(Feed.crawlable).not_to include(@ng_feed)}
    end

    context "subscribers_count" do
      before {
        @ok_feed = FactoryGirl.create(:crawl_ok_feed)
        @ng_feed = FactoryGirl.create(:crawl_ok_feed, subscribers_count: 0)
      }
      it { expect(Feed.crawlable).to include(@ok_feed)}
      it { expect(Feed.crawlable).not_to include(@ng_feed)}
    end

    context "crawled_on" do
      before {
        @ok_feed_1 = FactoryGirl.create(:crawl_ok_feed, crawl_status: FactoryGirl.create(:crawl_status, crawled_on: nil))
        @ok_feed_2 = FactoryGirl.create(:crawl_ok_feed, crawl_status: FactoryGirl.create(:crawl_status, crawled_on: 31.minutes.ago))
        @ng_feed = FactoryGirl.create(:crawl_ok_feed, crawl_status: FactoryGirl.create(:crawl_status, crawled_on: 29.minutes.ago))
      }
      it { expect(Feed.crawlable).to include(@ok_feed_1, @ok_feed_2)}
      it { expect(Feed.crawlable).not_to include(@ng_feed)}
    end
  end

  describe "#avg_rate" do
    before {
      @feed = FactoryGirl.create(:feed)
      FactoryGirl.create(:subscription, feed: @feed, member_id: 1, rate: 5)
      FactoryGirl.create(:subscription, feed: @feed, member_id: 2, rate: 5)
      FactoryGirl.create(:subscription, feed: @feed, member_id: 3, rate: 3)
    }
    it { expect(@feed.avg_rate).to eq(4) }
  end
end
