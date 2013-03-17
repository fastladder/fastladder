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
    before { @member = Factory(:member, password: 'mala', password_confirmation: 'mala') }

    context 'password is correct' do
      it { expect(Member.authenticate('bulkneets', 'mala')).to be }
    end

    context 'password is incorrect' do
      it { expect(Member.authenticate('bulkneets', 'ssig33')).to be_false }
    end
  end

  describe ".subscribe_feed" do
    let(:member) { Factory(:member, password: "mala", password_confirmation: "mala") }

    it "store feed's favicon" do
      feed = Factory(:feed)
      Feed.stub(:find_by_feedlink).with('url').and_return(nil)
      Feed.stub(:create_from_uri).with('url').and_return(feed)
      feed.should_receive(:fetch_favicon!)
      member.subscribe_feed('url')
    end
  end
end
