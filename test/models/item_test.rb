require "test_helper"

class ItemTest < ActiveSupport::TestCase
  test "as_json includes id" do
    item = FactoryBot.create(:item)
    json = item.as_json
    assert_includes json, :id
    assert_equal item.id, json[:id]
  end

  test "as_json includes link" do
    item = FactoryBot.create(:item)
    json = item.as_json
    assert_includes json, :link
    assert_equal item.link, json[:link]
  end

  test "as_json includes title" do
    item = FactoryBot.create(:item)
    json = item.as_json
    assert_includes json, :title
    assert_equal item.title, json[:title]
  end

  test "as_json includes body" do
    item = FactoryBot.create(:item)
    json = item.as_json
    assert_includes json, :body
    assert_equal item.body, json[:body]
  end

  test "as_json includes author" do
    item = FactoryBot.create(:item)
    json = item.as_json
    assert_includes json, :author
    assert_equal item.author, json[:author]
  end

  test "as_json includes category" do
    item = FactoryBot.create(:item)
    json = item.as_json
    assert_includes json, :category
    assert_equal item.category, json[:category]
  end

  test "as_json includes modified_on as timestamp" do
    item = FactoryBot.create(:item)
    json = item.as_json
    assert_includes json, :modified_on
    assert_equal item.modified_on.to_i, json[:modified_on]
  end

  test "as_json includes created_on as timestamp" do
    item = FactoryBot.create(:item)
    json = item.as_json
    assert_includes json, :created_on
    assert_equal item.created_on.to_i, json[:created_on]
  end

  test "stored_since with nil returns all items" do
    item_1 = FactoryBot.create(:item, stored_on: 20.hours.ago)
    item_2 = FactoryBot.create(:item, stored_on: 10.hours.ago)
    result = Item.stored_since(nil)
    assert_includes result, item_1
    assert_includes result, item_2
  end

  test "stored_since with time filters items" do
    item_1 = FactoryBot.create(:item, stored_on: 20.hours.ago)
    item_2 = FactoryBot.create(:item, stored_on: 10.hours.ago)
    result = Item.stored_since(15.hours.ago)
    refute_includes result, item_1
    assert_includes result, item_2
  end

  test "recent returns items in correct order" do
    item_1 = FactoryBot.create(:item, created_on: 1.hour.ago)
    item_2 = FactoryBot.create(:item, created_on: 3.hour.ago)
    item_3 = FactoryBot.create(:item, created_on: 2.hour.ago)
    assert_equal [item_1, item_3, item_2], Item.recent
  end

  test "recent with limit returns limited items" do
    item_1 = FactoryBot.create(:item, created_on: 1.hour.ago)
    item_2 = FactoryBot.create(:item, created_on: 3.hour.ago)
    item_3 = FactoryBot.create(:item, created_on: 2.hour.ago)
    assert_equal [item_1, item_3], Item.recent(2)
  end

  test "recent with limit and offset returns offset items" do
    item_1 = FactoryBot.create(:item, created_on: 1.hour.ago)
    item_2 = FactoryBot.create(:item, created_on: 3.hour.ago)
    item_3 = FactoryBot.create(:item, created_on: 2.hour.ago)
    assert_equal [item_3], Item.recent(1, 1)
  end

  test "item has default title" do
    item = FactoryBot.create(:item_without_title)
    refute_nil item.title
  end

  test "guid defaults to link" do
    item = FactoryBot.create(:item_without_guid)
    assert_equal item.link, item.guid
  end
end
