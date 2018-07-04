# == Schema Information
#
# Table name: items
#
#  id             :integer          not null, primary key
#  feed_id        :integer          default(0), not null
#  link           :string(255)      default(""), not null
#  title          :text             not null
#  body           :text
#  author         :string(255)
#  category       :string(255)
#  enclosure      :string(255)
#  enclosure_type :string(255)
#  digest         :string(255)
#  version        :integer          default(1), not null
#  stored_on      :datetime
#  modified_on    :datetime
#  created_on     :datetime         not null
#  updated_on     :datetime         not null
#

require 'spec_helper'

describe Item do
  let(:item) { FactoryBot.create(:item) }

  describe '.to_json' do
    let(:json) { item.as_json }

    it { expect(json).to include(id:    item.id)    }
    it { expect(json).to include(link:  item.link)  }
    it { expect(json).to include(title: item.title) }
    it { expect(json).to include(body:  item.body)  }
    it { expect(json).to include(author:   item.author)   }
    it { expect(json).to include(category: item.category) }
    it { expect(json).to include(modified_on: item.modified_on.to_i) }
    it { expect(json).to include(created_on:  item.created_on.to_i)  }
  end

  describe '.stored_since' do
    before {
      @item_1 = FactoryBot.create(:item, stored_on: 20.hours.ago)
      @item_2 = FactoryBot.create(:item, stored_on: 10.hours.ago)
    }
    context 'with nil' do
      it { expect(Item.stored_since(nil)).to include(@item_1, @item_2) }
    end
    context 'with time' do
      it { expect(Item.stored_since(15.hours.ago)).to include(@item_2) }
    end
  end

  describe '.recent' do
    before {
      @item_1 = FactoryBot.create(:item, created_on: 1.hour.ago)
      @item_2 = FactoryBot.create(:item, created_on: 3.hour.ago)
      @item_3 = FactoryBot.create(:item, created_on: 2.hour.ago)
    }
    context "with nil, nil" do
      it { expect(Item.recent).to eq([@item_1, @item_3, @item_2]) }
    end
    context "with limit" do
      it { expect(Item.recent(2)).to eq([@item_1, @item_3]) }
    end
    context "with limit, offset" do
      it { expect(Item.recent(1, 1)).to eq([@item_3]) }
    end
  end

  describe '#title' do
    subject { FactoryBot.create(:item_without_title).title }
    it { should_not eq(nil) }
  end

  describe '#guid' do
    let(:item) { FactoryBot.create(:item_without_guid) }
    it 'defaults to #link' do
      expect(item.guid).to eq(item.link)
    end
  end
end
