# == Schema Information
#
# Table name: items
#
#  id             :integer          not null, primary key
#  feed_id        :integer          default(0), not null
#  link           :string(255)      default(""), not null
#  title          :text             default(""), not null
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
  let(:item) { FactoryGirl.create(:item) }

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
end
