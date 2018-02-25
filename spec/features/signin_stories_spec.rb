require 'spec_helper'

describe "SigninStories" do
  subject { page }

  let(:member) {
    FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala')
  }

  context "when sign in as a member" do
    before { login_as(member) }

    it {
      expect(current_path).to be == '/reader/'
      expect(find('#welcome')).to have_content member.username
    }
  end
end
