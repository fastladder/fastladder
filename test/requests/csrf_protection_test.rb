require "test_helper"

class CsrfProtectionTest < ActionDispatch::IntegrationTest
  def setup
    @member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
    @member.set_auth_key
    @feed = FactoryBot.create(:feed)
    @subscription = FactoryBot.create(:subscription, feed: @feed, member: @member, has_unread: true)
    post session_path, params: { username: @member.username, password: "mala" }
  end

  def teardown
    ActionController::Base.allow_forgery_protection = false
  end

  test "session authenticated api call is rejected without a token" do
    with_forgery_protection do
      post "/api/touch_all", params: { subscribe_id: @subscription.id }
    end

    assert_response :unprocessable_entity
    assert @subscription.reload.has_unread
  end

  test "session authenticated api call is accepted with the ApiKey token" do
    with_forgery_protection do
      post "/api/touch_all", params: { subscribe_id: @subscription.id, ApiKey: api_key }
    end

    assert_response :success
    assert_not @subscription.reload.has_unread
  end

  test "api key authenticated api call is accepted without a token" do
    reset!

    with_forgery_protection do
      post "/api/touch_all", params: { subscribe_id: @subscription.id, auth_key: @member.auth_key }
    end

    assert_response :success
    assert_not @subscription.reload.has_unread
  end

  test "subscribe is rejected without a token" do
    with_forgery_protection do
      post "/subscribe/http://example.com/", params: { check_for_subscribe: ["http://example.com/feed"] }
    end

    assert_response :unprocessable_entity
    assert_equal 1, @member.subscriptions.count
  end

  private

  def with_forgery_protection
    ActionController::Base.allow_forgery_protection = true
    yield
  ensure
    ActionController::Base.allow_forgery_protection = false
  end

  # Read the token the front end sends back as the ApiKey parameter.
  def api_key
    get reader_path
    assert_response :success
    response.body[/var ApiKey = "([^"]+)"/, 1]
  end
end
