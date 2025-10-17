# frozen_string_literal: true

require "application_system_test_case"

class ConfigTest < ApplicationSystemTestCase
  setup do
    @dankogai = Member.create!(username: "dankogai", password: "kogaidan", password_confirmation: "kogaidan")
    visit "/login"
    fill_in "username", with: "dankogai"
    fill_in "password", with: "kogaidan"
    click_on "Sign In"
    assert_current_path "/reader/"
    assert_text "Loading completed.", wait: 10
  end

  test "can change display config" do
    click_on "Settings"
    assert_text "Fastladder Settings", wait: 10
    find("#tab_config_view").click

    assert_text "For shorter loading time, set the limit smaller.", wait: 10

    fill_in "current_font", with: "24"
    click_on "Save"

    visit "/reader/"
    assert_text "Loading completed.", wait: 10
    click_on "Settings"
    assert_text "Fastladder Settings"
    find("#tab_config_view").click

    assert_text "For shorter loading time, set the limit smaller."

    assert_equal "24", find("#save_current_font").value

    dump = nil
    10.times do
      dump = @dankogai.reload.config_dump
      break if dump["current_font"] == "24"
      sleep 0.3
    end
    assert_equal "24", dump["current_font"]
  end
end
