# frozen_string_literal: true

require "application_system_test_case"

class SignupStoriesTest < ApplicationSystemTestCase
  test "sign up as a first member" do
    initial_count = Member.count

    visit "/"
    fill_in "member_username", with: "bulkneets"
    fill_in "member_password", with: "mala"
    fill_in "member_password_confirmation", with: "mala"
    click_on "Sign Up"

    assert_current_path "/reader/"

    assert_equal initial_count + 1, Member.count
  end

  test "sign up as a second member" do
    Member.create!(username: "bulkneets", password: "mala", password_confirmation: "mala")
    initial_count = Member.count

    visit "/signup"
    fill_in "member_username", with: "_bulkneets"
    fill_in "member_password", with: "mala"
    fill_in "member_password_confirmation", with: "mala"
    click_on "Sign Up"

    assert_current_path "/reader/"

    assert_equal initial_count + 1, Member.count
  end
end
