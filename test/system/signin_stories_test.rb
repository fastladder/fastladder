# frozen_string_literal: true

require "application_system_test_case"

class SigninStoriesTest < ApplicationSystemTestCase
  test "sign in as a member" do
    member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")

    visit "/login"
    fill_in "username", with: member.username
    fill_in "password", with: "mala"
    click_on "Sign In"

    assert_current_path "/reader/"
    within "#welcome" do
      assert_text member.username
    end
  end
end
