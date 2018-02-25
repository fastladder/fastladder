# == Schema Information
#
# Table name: members
#
#  id                        :integer          not null, primary key
#  username                  :string(255)      not null
#  email                     :string(255)
#  crypted_password          :string(255)
#  salt                      :string(255)
#  remember_token            :string(255)
#  remember_token_expires_at :datetime
#  config_dump               :text
#  public                    :boolean          default(FALSE), not null
#  created_on                :datetime         not null
#  updated_on                :datetime         not null
#  auth_key                  :string(255)
#

require 'spec_helper'

describe Member do
  describe '.authenticate' do
    before { @member = FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala') }

    context 'password is correct' do
      it { expect(Member.authenticate('bulkneets', 'mala')).to be }
    end

    context 'password is incorrect' do
      it { expect(Member.authenticate('bulkneets', 'ssig33')).to be_nil }
    end
  end

  describe "#public_subscribe_count" do
    before {
      @member = FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala')
      FactoryBot.create(:subscription, member: @member, feed: FactoryBot.create(:feed), public: true)
      FactoryBot.create(:subscription, member: @member, feed: FactoryBot.create(:feed), public: false)
      FactoryBot.create(:subscription, member: @member, feed: FactoryBot.create(:feed), public: false)
    }
    it { expect(@member.public_subscribe_count).to eq(1) }
  end

  describe "#public_subs" do
    before {
      @member = FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala')
      @public_subscription = FactoryBot.create(:subscription, member: @member, feed: FactoryBot.create(:feed), public: true)
      @non_public_subscription = FactoryBot.create(:subscription, member: @member, feed: FactoryBot.create(:feed), public: false)
    }
    it { expect(@member.public_subs).to include(@public_subscription) }
    it { expect(@member.public_subs).not_to include(@non_public_subscription) }
  end

  describe "#recent_subs" do
    before {
      @member = FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala')
      @sub_1 = FactoryBot.create(:subscription, member: @member, feed: FactoryBot.create(:feed), created_on: 1.day.ago)
      @sub_2 = FactoryBot.create(:subscription, member: @member, feed: FactoryBot.create(:feed), created_on: 3.day.ago)
      @sub_3 = FactoryBot.create(:subscription, member: @member, feed: FactoryBot.create(:feed), created_on: 2.day.ago)
      @sub_4 = FactoryBot.create(:subscription, member: @member, feed: FactoryBot.create(:feed), created_on: 4.day.ago)
    }
    it { expect(@member.recent_subs(3).size).to eq(3) }
    it { expect(@member.recent_subs(3)).to eq([@sub_1, @sub_3, @sub_2]) }
  end
end
