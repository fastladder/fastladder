require 'spec_helper'

describe "SignoutStories" do
  let(:member) {
    FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala')
  }

  context "when sign in as a member" do
    before { login_as(member) }

    it {
      click_on 'Sign Out'
      expect(current_path).to be == '/login'
    }
  end
end
