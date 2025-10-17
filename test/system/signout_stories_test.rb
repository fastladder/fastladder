# frozen_string_literal: true

require "application_system_test_case"

class SignoutStoriesTest < ApplicationSystemTestCase
  test "sign out as a member" do
    member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")

    visit "/login"
    fill_in "username", with: member.username
    fill_in "password", with: "mala"
    click_on "Sign In"
    assert_current_path "/reader/"

    click_on "Sign Out"
    assert_current_path "/login"
  end
end
