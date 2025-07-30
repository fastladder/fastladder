# frozen_string_literal: true

require "application_system_test_case"

class AccountTest < ApplicationSystemTestCase
  setup do
    @member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
    visit "/login"
    fill_in "username", with: @member.username
    fill_in "password", with: "mala"
    click_on "Sign In"
    assert_equal "/reader/", current_path
  end

  test "sets auth key when none exists" do
    assert_nil @member.auth_key
    click_link "Account"
    click_link "API key"
    click_button "Set or Change Auth Key"
    assert_not_nil @member.reload.auth_key
  end

  test "changes existing auth key" do
    @member.set_auth_key
    @member.save!

    old_auth_key = @member.auth_key
    assert_not_nil old_auth_key

    click_link "Account"
    click_link "API key"
    click_button "Set or Change Auth Key"

    new_auth_key = @member.reload.auth_key
    assert_not_nil new_auth_key
    assert_not_equal old_auth_key, new_auth_key
  end
end
