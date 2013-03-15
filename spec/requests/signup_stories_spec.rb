require 'spec_helper'

describe "SignupStories" do
  it "sign up as a first member" do
    expect {
      visit "/"
      fill_in 'member_username', with: 'bulkneets'
      fill_in 'member_password', with: 'mala'
      fill_in 'member_password_confirmation', with: 'mala'
      click_on 'Sign Up'

      # expect(page.body).to match(/Thanks for signing up!/) # TODO: reader#index rendered without layout (notice flash does not rendered)
    }.to change {
      Member.count
    }.by(1)
  end
end
