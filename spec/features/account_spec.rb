require 'spec_helper'

feature 'Set auth key' do
  let(:member) { FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala') }

  before do
    login_as(member)
  end

  context 'without auth key' do
    it 'sets auth key' do
      expect(member.auth_key).to be_blank
      click_link 'Account'
      click_link 'API key'
      click_button 'Set or Change Auth Key'
      expect(member.reload.auth_key).to be_present
    end
  end

  context 'changes auth key' do
    before do
      member.set_auth_key
      member.save!
    end

    scenario 'generates auth key' do
      expect(member.auth_key).to be_present
      expect {
        click_link 'Account'
        click_link 'API key'
        click_button 'Set or Change Auth Key'
      }.to change { member.reload.auth_key }
    end
  end
end
