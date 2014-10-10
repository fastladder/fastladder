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
end
