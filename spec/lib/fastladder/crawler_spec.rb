require 'spec_helper'

describe 'Fastladder::Crawler' do
  let(:crawler) { Fastladder::Crawler.new(Rails.logger) }
  let(:feed) { FactoryGirl.create(:feed) }

  context 'when some items have same guid' do
    let(:items) { FactoryGirl.build_list(:item_has_fixed_guid, 2) }

    describe '#reject_duplicated' do
      it 'takes the first of them' do
        expect(crawler.send(:reject_duplicated, feed, items)).to eq(items.take(1))
      end
    end
  end

  context 'when items are duplicated' do
    let(:items) { FactoryGirl.build_list(:item_has_fixed_guid, 1) }
    before {
      FactoryGirl.create(:item_has_fixed_guid, feed: feed)
      items.each { |item| item.create_digest }
    }

    describe '#reject_duplicated' do
      it 'rejects them' do
        expect(crawler.send(:reject_duplicated, feed, items)).to be_empty
      end
    end
  end

  describe '#update' do
    let(:source) { double('HTTP response', body: atom_body) }
    let(:atom_body) { File.read(File.expand_path('../../fixtures/github.private.atom', __dir__)) }

    before do
      feed.feedlink = 'http://example.com/private.atom'
      feed.save!
      # Disable favicon fetch
      allow(feed).to receive(:favicon_list).and_return([])
    end

    it 'rewrites relative links in item body' do
      crawler.send(:update, feed, source)
      expect(feed.items.count).to eq(1)
      item = feed.items.first
      doc = Nokogiri::HTML.fragment(item.body)
      expect(doc.css('a[href="http://example.com/bundler/bundler/tree/1-9-stable"]').size).to eq(1)
    end
  end
end
