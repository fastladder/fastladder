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
    before { @member = FactoryGirl.create(:member, password: 'mala', password_confirmation: 'mala') }

    context 'password is correct' do
      it { expect(Member.authenticate('bulkneets', 'mala')).to be }
    end

    context 'password is incorrect' do
      it { expect(Member.authenticate('bulkneets', 'ssig33')).to be_false }
    end
  end

  describe "#public_subscribe_count" do
    before {
      @member = FactoryGirl.create(:member, password: 'mala', password_confirmation: 'mala')
      FactoryGirl.create(:subscription, member: @member, feed: FactoryGirl.create(:feed), public: true)
      FactoryGirl.create(:subscription, member: @member, feed: FactoryGirl.create(:feed), public: false)
      FactoryGirl.create(:subscription, member: @member, feed: FactoryGirl.create(:feed), public: false)
    }
    it { expect(@member.public_subscribe_count).to eq(1) }
  end

  describe "#public_subs" do
    before {
      @member = FactoryGirl.create(:member, password: 'mala', password_confirmation: 'mala')
      @public_subscription = FactoryGirl.create(:subscription, member: @member, feed: FactoryGirl.create(:feed), public: true)
      @non_public_subscription = FactoryGirl.create(:subscription, member: @member, feed: FactoryGirl.create(:feed), public: false)
    }
    it { expect(@member.public_subs).to include(@public_subscription) }
    it { expect(@member.public_subs).not_to include(@non_public_subscription) }
  end
end
