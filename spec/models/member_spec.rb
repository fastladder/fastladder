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
#
# Indexes
#
#  index_members_on_username  (username) UNIQUE
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
end
