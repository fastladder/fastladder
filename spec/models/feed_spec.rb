# == Schema Information
#
# Table name: feeds
#
#  id                :integer          not null, primary key
#  feedlink          :string(255)      not null
#  link              :string(255)      not null
#  title             :text             not null
#  description       :text             not null
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

    describe '#title' do
      subject { super().title }
      it { should == "Recent Commits to fastladder:master" }
    end

    describe '#feedlink' do
      subject { super().feedlink }
      it { should == "https://github.com/fastladder/fastladder/commits/master.atom" }
    end

    describe '#link' do
      subject { super().link }
      it { should == "https://github.com/fastladder/fastladder/commits/master" }
    end

    describe '#description' do
      subject { super().description }
      it { should == "" }
    end
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

  describe "except fragment identifier" do
    subject { FactoryBot.create(:feed, feedlink: "http://example.com/rss#_=_") }

    describe '#feedlink' do
      subject { super().feedlink }
      it { should == "http://example.com/rss" }
    end
  end

  describe "fetch favicon" do
    include_context(:use_stub_feed)

    let(:feed) { FactoryBot.create(:feed) }
    let(:favicon) { open(File.expand_path(File.join(File.dirname(__FILE__), '..', 'fixtures', 'favicon.ico'))).read }

    it "favicon.ico store as PNG" do
      stub_request(:any, /.*/).to_return(headers: { 'Content-Type' => 'image/vnd.microsoft.icon' }, body: favicon)
      feed.fetch_favicon!
      expect(feed.favicon.image.start_with?("\x89PNG\r\n".force_encoding('ascii-8bit'))).to eq(true)
    end

    it "if favicon url is *.gif and returning vnd.microsoft.icon" do
      stub_request(:any, /.*/).to_return(body: favicon, headers: {"Content-Type" => 'image/vnd.microsoft.icon'})
      allow(feed).to receive(:favicon_list).and_return([Addressable::URI.parse("http://example.com/favicon?file=favicon.gif")])
      feed.fetch_favicon!
      expect(feed.favicon.image.start_with?("\x89PNG\r\n".force_encoding('ascii-8bit'))).to eq(true)
    end

    it 'logs errors and does `next` when favicon.ico is not valid data' do
      stub_request(:any, /.*/).to_return(body: "invalid image data")
      expect(MiniMagick::Image).to receive(:open).at_least(:once).and_raise(MiniMagick::Error)
      expect(Rails.logger).to receive(:error).at_least(:once)
      feed.fetch_favicon!
    end
  end

  describe ".favicon_list" do
    let(:favicon_url) { Addressable::URI.parse("http://icon.example.com/favicon.gif").normalize }

    it "favicon url detection from feed.link" do
      feed = FactoryBot.create(:feed, link: "http://example.com/")
      stub_request(:get, feed.link).to_return(
        body: <<-HTML
          <html>
            <head>
              <link rel="shortcut icon" href="#{favicon_url.to_s}">
            </head>
            <body></body>
          </html>
        HTML
      )
      stub_request(:get, feed.feedlink).to_return(body: "")
      expect(feed.favicon_list).to include(favicon_url)
    end
  end

  describe '.crawlable' do
    context "crawl_status" do
      before {
        @ok_feed = FactoryBot.create(:crawl_ok_feed)
        @ng_feed = FactoryBot.create(:crawl_ok_feed, crawl_status: FactoryBot.create(:crawl_status, status: Fastladder::Crawler::CRAWL_NOW))
      }
      it { expect(Feed.crawlable).to include(@ok_feed)}
      it { expect(Feed.crawlable).not_to include(@ng_feed)}
    end

    context "subscribers_count" do
      before {
        @ok_feed = FactoryBot.create(:crawl_ok_feed)
        @ng_feed = FactoryBot.create(:crawl_ok_feed, subscribers_count: 0)
      }
      it { expect(Feed.crawlable).to include(@ok_feed)}
      it { expect(Feed.crawlable).not_to include(@ng_feed)}
    end

    context "crawled_on" do
      before {
        @ok_feed_1 = FactoryBot.create(:crawl_ok_feed, crawl_status: FactoryBot.create(:crawl_status, crawled_on: nil))
        @ok_feed_2 = FactoryBot.create(:crawl_ok_feed, crawl_status: FactoryBot.create(:crawl_status, crawled_on: 31.minutes.ago))
        @ng_feed = FactoryBot.create(:crawl_ok_feed, crawl_status: FactoryBot.create(:crawl_status, crawled_on: 29.minutes.ago))
      }
      it { expect(Feed.crawlable).to include(@ok_feed_1, @ok_feed_2)}
      it { expect(Feed.crawlable).not_to include(@ng_feed)}
    end
  end

  describe "#avg_rate" do
    before {
      @feed = FactoryBot.create(:feed)
      FactoryBot.create(:subscription, feed: @feed, member_id: 1, rate: 5)
      FactoryBot.create(:subscription, feed: @feed, member_id: 2, rate: 5)
      FactoryBot.create(:subscription, feed: @feed, member_id: 3, rate: 3)
    }
    it { expect(@feed.avg_rate).to eq(4) }
  end

  describe "#description" do
    subject { FactoryBot.create(:feed_without_description).description }
    it { should_not eq(nil) }
  end

  describe "#title" do
    subject { FactoryBot.create(:feed_without_title).title }
    it { should_not eq(nil) }
  end
end
