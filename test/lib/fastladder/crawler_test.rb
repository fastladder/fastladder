require "test_helper"
require "fastladder/crawler"

class Fastladder::CrawlerTest < ActiveSupport::TestCase
  def setup
    @crawler = Fastladder::Crawler.new(Rails.logger)
    @feed = FactoryBot.create(:feed)
  end

  test "reject_duplicated takes the first when some items have same guid" do
    items = FactoryBot.build_list(:item_has_fixed_guid, 2)

    result = @crawler.send(:reject_duplicated, @feed, items)
    assert_equal items.take(1), result
  end

  test "reject_duplicated rejects duplicated items" do
    items = FactoryBot.build_list(:item_has_fixed_guid, 1)
    FactoryBot.create(:item_has_fixed_guid, feed: @feed)
    items.each { |item| item.create_digest }

    result = @crawler.send(:reject_duplicated, @feed, items)
    assert_empty result
  end

  test "reject_stale_item_updates rejects existing item when feed timestamp is older than stored_on" do
    stored_on = Time.zone.parse("2026-07-07 12:00:00")
    old_item = FactoryBot.create(:item, feed: @feed, guid: "same-guid", link: "http://example.com/item",
                                        body: "old body", stored_on: stored_on, modified_on: stored_on - 1.day)
    item = FactoryBot.build(:item, feed: @feed, guid: old_item.guid, link: old_item.link,
                                   body: "changed body", stored_on: stored_on + 1.hour,
                                   modified_on: stored_on - 1.second)

    result = @crawler.send(:reject_stale_item_updates, @feed, [item])

    assert_empty result
  end

  test "reject_stale_item_updates keeps existing item when feed timestamp is newer than stored_on" do
    stored_on = Time.zone.parse("2026-07-07 12:00:00")
    old_item = FactoryBot.create(:item, feed: @feed, guid: "same-guid", link: "http://example.com/item",
                                        body: "old body", stored_on: stored_on, modified_on: stored_on - 1.day)
    item = FactoryBot.build(:item, feed: @feed, guid: old_item.guid, link: old_item.link,
                                   body: "changed body", stored_on: stored_on + 1.hour,
                                   modified_on: stored_on + 1.second)

    result = @crawler.send(:reject_stale_item_updates, @feed, [item])

    assert_equal [item], result
  end

  test "reject_ignored_body_updates keeps body-only updates when feed does not ignore them" do
    old_item = FactoryBot.create(:item, feed: @feed, body: "old body")
    item = FactoryBot.build(:item, feed: @feed, guid: old_item.guid, link: old_item.link,
                                   title: old_item.title, body: "changed body")

    result = @crawler.send(:reject_ignored_body_updates, @feed, [item])

    assert_equal [item], result
  end

  test "reject_ignored_body_updates rejects body-only updates when feed ignores them" do
    @feed.update!(ignore_body_update: true)
    old_item = FactoryBot.create(:item, feed: @feed, body: "old body")
    item = FactoryBot.build(:item, feed: @feed, guid: old_item.guid, link: old_item.link,
                                   title: old_item.title, body: "changed body")

    result = @crawler.send(:reject_ignored_body_updates, @feed, [item])

    assert_empty result
  end

  test "reject_ignored_body_updates keeps updates that also change the title" do
    @feed.update!(ignore_body_update: true)
    old_item = FactoryBot.create(:item, feed: @feed, body: "old body")
    item = FactoryBot.build(:item, feed: @feed, guid: old_item.guid, link: old_item.link,
                                   title: "changed title", body: "changed body")

    result = @crawler.send(:reject_ignored_body_updates, @feed, [item])

    assert_equal [item], result
  end

  test "reject_ignored_body_updates keeps updates that also change the link" do
    @feed.update!(ignore_body_update: true)
    old_item = FactoryBot.create(:item, feed: @feed, body: "old body")
    item = FactoryBot.build(:item, feed: @feed, guid: old_item.guid, link: "http://example.com/moved",
                                   title: old_item.title, body: "changed body")

    result = @crawler.send(:reject_ignored_body_updates, @feed, [item])

    assert_equal [item], result
  end

  test "reject_ignored_body_updates keeps new items" do
    @feed.update!(ignore_body_update: true)
    item = FactoryBot.build(:item, feed: @feed, guid: "brand-new-guid")

    result = @crawler.send(:reject_ignored_body_updates, @feed, [item])

    assert_equal [item], result
  end

  test "reject_ignored_body_updates rejects body-only updates for feeds on listed domains" do
    feed = FactoryBot.create(:feed, feedlink: "http://rssblog.ameba.jp/someone/rss20.xml",
                                    link: "http://ameblo.jp/someone/")
    old_item = FactoryBot.create(:item, feed: feed, body: "old body")
    item = FactoryBot.build(:item, feed: feed, guid: old_item.guid, link: old_item.link,
                                   title: old_item.title, body: "changed body")

    result = @crawler.send(:reject_ignored_body_updates, feed, [item])

    assert_empty result
  end

  test "update rewrites relative links in item body" do
    atom_body = File.read(File.expand_path("../../fixtures/github.private.atom", __dir__))
    source = Struct.new(:body).new(atom_body)

    @feed.feedlink = "http://example.com/private.atom"
    @feed.save!
    @feed.stub(:favicon_list, []) do
      @crawler.send(:update, @feed, source)
    end

    assert_equal 1, @feed.items.count
    item = @feed.items.first
    doc = Nokogiri::HTML.fragment(item.body)
    assert_equal 1, doc.css('a[href="http://example.com/bundler/bundler/tree/1-9-stable"]').size
  end

  test "cut_off limits items when too large feed" do
    items = FactoryBot.build_list(:item, Fastladder::Crawler::ITEMS_LIMIT + 1)
    @feed.items << items

    result = @crawler.send(:cut_off, @feed, items)
    assert_equal Fastladder::Crawler::ITEMS_LIMIT, result.size
  end

  test "new_items_count finds new item" do
    atom_body = File.read(File.expand_path("../../fixtures/github.private.atom", __dir__))
    source = Struct.new(:body).new(atom_body)
    parsed = Feedjira.parse(source.body)
    items = @crawler.send(:build_items, @feed, parsed)

    @feed.feedlink = "http://example.com/private.atom"
    @feed.save!
    @feed.stub(:favicon_list, []) do
      count = @crawler.send(:new_items_count, @feed, items)
      assert_equal 1, count
    end
  end

  test "new_items_count does not find new item when feed not updated since last update" do
    atom_body = File.read(File.expand_path("../../fixtures/github.private.atom", __dir__))
    source = Struct.new(:body).new(atom_body)
    parsed = Feedjira.parse(source.body)

    @feed.feedlink = "http://example.com/private.atom"
    @feed.save!
    @feed.stub(:favicon_list, []) do
      @crawler.send(:update, @feed, source)
      items = @crawler.send(:build_items, @feed, parsed)
      count = @crawler.send(:new_items_count, @feed, items)
      assert_equal 0, count
    end
  end
end
