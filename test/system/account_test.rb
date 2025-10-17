# frozen_string_literal: true

require "application_system_test_case"

class AccountTest < ApplicationSystemTestCase
  setup do
    @member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
    visit "/login"
    fill_in "username", with: @member.username
    fill_in "password", with: "mala"
    click_on "Sign In"
    assert_current_path "/reader/"
  end

  test "sets auth key when none exists" do
    assert_nil @member.auth_key
    click_link "Account"
    click_link "API key"
    click_button "Set or Change Auth Key"
    auth_key = nil
    50.times do
      auth_key = @member.reload.auth_key
      break if auth_key.present?
      sleep 0.1
    end
    assert_not_nil auth_key
  end

  test "changes existing auth key" do
    @member.set_auth_key
    @member.save!

    old_auth_key = @member.auth_key
    assert_not_nil old_auth_key

    click_link "Account"
    click_link "API key"
    click_button "Set or Change Auth Key"

    new_auth_key = nil
    equal = true
    50.times do
      new_auth_key = @member.reload.auth_key
      if new_auth_key && new_auth_key != old_auth_key
        equal = false
        break
      end
      sleep 0.1
    end
    refute equal
  end
end
