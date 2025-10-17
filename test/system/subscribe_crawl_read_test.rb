# frozen_string_literal: true

require "application_system_test_case"
require "fastladder/crawler"

class SubscribeCrawlReadTest < ApplicationSystemTestCase
  setup do
    @dankogai = Member.create!(username: "dankogai", password: "kogaidan", password_confirmation: "kogaidan")
    visit "/login"
    fill_in "username", with: "dankogai"
    fill_in "password", with: "kogaidan"
    click_on "Sign In"
    assert_current_path "/reader/"
    assert_text "Loading completed.", wait: 10
    WebMock.disable_net_connect!(allow_localhost: true)

    stub_request(:get,
                 # rubocop:todo Layout/LineLength
                 "http://example.com/").and_return(body: File.read(Rails.root.join("test/fixtures/examlpe.com.index.html")))
    # rubocop:enable Layout/LineLength
    stub_request(:get,
                 # rubocop:todo Layout/LineLength
                 "http://example.com/feed.xml").and_return(body: File.read(Rails.root.join("test/fixtures/examlpe.com.feed.xml")))
    # rubocop:enable Layout/LineLength

    stub_request(:get,
                 # rubocop:todo Layout/LineLength
                 "http://example.com/ebi").and_return(body: File.read(Rails.root.join("test/fixtures/examlpe.com.ebi.html")))
    # rubocop:enable Layout/LineLength
    stub_request(:get,
                 # rubocop:todo Layout/LineLength
                 "http://example.com/ebi.feed.xml").and_return(body: File.read(Rails.root.join("test/fixtures/examlpe.com.ebi.feed.xml")))
    # rubocop:enable Layout/LineLength

    stub_request(:get, "http://example.com/favicon.ico").and_return(body: "")
  end

  test "you can subscribe, crawl and read feeds" do
    find('div[onclick="Control.show_subscribe_form()"]').click
    assert_text "Feed URL", wait: 10
    fill_in "url", with: "http://example.com/"
    click_on "next"

    assert_text "0 users", wait: 10

    find('a.sub_button[rel="subscribe"]').click
    assert_text "Unsubscribe", wait: 10

    find('span.button[onclick="Control.hide_subscribe_form()"]').click

    find('div[onclick="Control.show_subscribe_form()"]').click
    assert_text "Feed URL", wait: 10
    fill_in "url", with: "http://example.com/ebi"
    click_on "next"

    assert_text "0 users", wait: 10

    find('a.sub_button[rel="subscribe"]').click
    assert_text "Unsubscribe", wait: 10
    page.save_screenshot("tmp/subscribe_crawl_read_test_1.png")
    find('span.button[onclick="Control.hide_subscribe_form()"]').click

    sleep 1 while @dankogai.reload.subscriptions.count < 2

    assert_equal 2, @dankogai.subscriptions.count

    Feed.find_each { Fastladder::Crawler.new(Rails.logger).crawl(_1) }

    kuma = Feed.find_by(link: "http://example.com/feed.xml")
    ebi = Feed.find_by(link: "http://example.com/ebi.feed.xml")

    assert_equal 3, kuma.items.count
    assert_equal 3, ebi.items.count

    # press key 'r'
    visit "/reader/"
    page.save_screenshot("tmp/subscribe_crawl_read_test_1.png")

    assert_text "熊に関する最新ニュース (3)", wait: 5
    assert_text "海老に関する最新ニュース (3)"
    page.save_screenshot("tmp/subscribe_crawl_read_test_1.png")

    kuma_subscription = @dankogai.subscriptions.find_by(feed: kuma)
    ebi_subscription = @dankogai.subscriptions.find_by(feed: ebi)

    find("span[subscribe_id='#{kuma_subscription.id}']").click

    assert_text "熊に関する架空の最新ニュースを提供するチャンネルです。", wait: 3

    assert_text "北海道で熊がハイキングコースを散策"
    assert_text "環境保護団体が熊の動向を追跡するための新しいGPSトラッカーの実験を開始しました。"
    assert_text "子熊の保護施設が一般公開"

    find("span[subscribe_id='#{ebi_subscription.id}']").click

    assert_text "海老に関する架空の最新ニュースを提供するチャンネルです。", wait: 3

    assert_text "海老の大量発生が地元の生態系に影響"
  end
end
