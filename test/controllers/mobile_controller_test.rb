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
end
