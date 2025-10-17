# frozen_string_literal: true

require "application_system_test_case"

class SubscribeSystemTest < ApplicationSystemTestCase
  test "can access subscribe confirm page with url that has .rss" do
    @dankogai = Member.create!(username: "dankogai", password: "kogaidan", password_confirmation: "kogaidan")
    visit "/login"
    fill_in "username", with: "dankogai"
    fill_in "password", with: "kogaidan"
    click_on "Sign In"

    assert_current_path "/reader/"

    stub_request(:get, "https://example.com/feed.rss?keyword=123")
      .to_return(status: 200, body: File.read(Rails.root.join("test/fixtures/examlpe.com.feed.xml")))

    visit "/subscribe/https://example.com/feed.rss?keyword=123"

    assert_text "Subscribe Feed"
  end
end
