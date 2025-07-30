require "test_helper"

class SubscriptionTest < ActiveSupport::TestCase
  test "creation updates subscribers count" do
    feed = FactoryBot.create(:feed)
    original_count = feed.subscribers_count

    subscription = Subscription.new
    subscription.feed = feed
    subscription.member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
    subscription.save

    feed.reload
    assert_equal original_count + 1, feed.subscribers_count
  end

  test "creation sets default public value" do
    feed = FactoryBot.create(:feed)
    member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")

    subscription = Subscription.new
    subscription.feed = feed
    subscription.member = member
    subscription.public = nil
    subscription.save

    assert_equal false, subscription.public
  end

  test "destroy updates subscribers count" do
    subscription = FactoryBot.create(:subscription)
    feed = subscription.feed
    original_count = feed.subscribers_count

    subscription.destroy

    feed.reload
    assert_equal original_count - 1, feed.subscribers_count
  end
end
