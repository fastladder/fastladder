require "test_helper"

class MobileControllerTest < ActionController::TestCase
  def setup
    @member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
  end

  test "GET read_feed sanitizes item body" do
    item = FactoryBot.create(:item,
                             body: '<script>alert(1)</script><img src="x" onerror="alert(2)"><b style="color:red">hello</b>',
                             stored_on: 1.hour.ago)
    feed = FactoryBot.create(:feed, items: [ item ])
    subscription = @member.subscriptions.create!(feed: feed, has_unread: true, viewed_on: 2.hours.ago)

    get :read_feed, params: { feed_id: subscription.id }, session: { member_id: @member.id }

    assert_response :success
    rendered_body = css_select("#item-#{item.id} > div").first.inner_html
    assert_no_match(/<script/, rendered_body)
    assert_no_match(/onerror/, rendered_body)
    assert_no_match(/style=/, rendered_body)
    assert_match(/<b>hello<\/b>/, rendered_body)
  end

  test "GET read_feed does not expose another member's subscription" do
    subscription = other_members_subscription

    assert_raises(ActiveRecord::RecordNotFound) do
      get :read_feed, params: { feed_id: subscription.id }, session: { member_id: @member.id }
    end
  end

  test "GET mark_as_read does not touch another member's subscription" do
    subscription = other_members_subscription

    assert_raises(ActiveRecord::RecordNotFound) do
      get :mark_as_read, params: { feed_id: subscription.id, timestamp: Time.now.to_i },
                         session: { member_id: @member.id }
    end
    assert subscription.reload.has_unread
  end

  test "GET pin does not pin an item from a feed the member is not subscribed to" do
    subscription = other_members_subscription
    item = subscription.feed.items.first

    assert_raises(ActiveRecord::RecordNotFound) do
      get :pin, params: { item_id: item.id }, session: { member_id: @member.id }
    end
    assert_equal 0, @member.pins.count
  end

  test "GET pin redirects back to the member's own subscription" do
    # Unsubscribed feeds keep the feed id and the subscription id from lining up.
    FactoryBot.create_list(:feed, 3)
    item = FactoryBot.create(:item, stored_on: 1.hour.ago)
    feed = FactoryBot.create(:feed, items: [ item ])
    subscription = @member.subscriptions.create!(feed: feed, has_unread: true, viewed_on: 2.hours.ago)

    get :pin, params: { item_id: item.id }, session: { member_id: @member.id }

    assert_redirected_to "/mobile/#{subscription.id}#item-#{item.id}"
    assert_equal [ item.link ], @member.pins.pluck(:link)
  end

  private

  def other_members_subscription
    other_member = FactoryBot.create(:member, username: "someone-else", email: "someone-else@example.com",
                                              password: "mala", password_confirmation: "mala")
    item = FactoryBot.create(:item, stored_on: 1.hour.ago)
    feed = FactoryBot.create(:feed, items: [ item ])
    other_member.subscriptions.create!(feed: feed, has_unread: true, viewed_on: 2.hours.ago)
  end
end
