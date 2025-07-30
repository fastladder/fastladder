require "test_helper"

class Api::FeedControllerTest < ActionController::TestCase
  def setup
    @member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
    @feed = FactoryBot.create(:feed, feedlink: "http://feeds.feedburner.com/mala/blog")
    @subscription = FactoryBot.create(:subscription, feed: @feed, member: @member)
    @folder = FactoryBot.create(:folder, member: @member)
  end

  test "POST discover renders json" do
    stub_request(:any, "http://feeds.feedburner.com/mala/blog")
    post :discover, params: { url: @feed.feedlink }, session: { member_id: @member.id }
    assert_valid_json response.body
  end

  test "POST discover renders error without url" do
    post :discover, session: { member_id: @member.id }
    assert_json_error response.body
  end

  test "POST subscribed renders json" do
    post :subscribed, params: { feedlink: @feed.feedlink, subscribe_id: @subscription.id }, session: { member_id: @member.id }
    assert_valid_json response.body
  end

  test "POST subscribe renders json" do
    post :subscribe, params: { feedlink: @feed.feedlink }, session: { member_id: @member.id }
    assert_valid_json response.body
  end

  test "POST subscribe renders error without feedlink" do
    post :subscribe, session: { member_id: @member.id }
    assert_json_error response.body
  end

  test "POST update renders json" do
    post :update, params: { subscribe_id: @subscription.id, folder_id: @folder.id }, session: { member_id: @member.id }
    assert_valid_json response.body
  end

  test "POST update renders error without subscribe_id" do
    post :update, params: { folder_id: @folder.id }, session: { member_id: @member.id }
    assert_json_error response.body
  end

  test "POST unsubscribe renders json" do
    post :unsubscribe, params: { subscribe_id: @subscription.id, folder_id: @folder.id }, session: { member_id: @member.id }
    assert_valid_json response.body
  end

  test "POST unsubscribe renders error without subscribe_id" do
    post :unsubscribe, params: { folder_id: @folder.id }, session: { member_id: @member.id }
    assert_json_error response.body
  end

  test "POST set_rate renders json" do
    post :set_rate, params: { subscribe_id: @subscription.id, rate: 3 }, session: { member_id: @member.id }
    assert_valid_json response.body
  end

  test "POST set_rate renders error without subscribe_id" do
    post :set_rate, params: { rate: 3 }, session: { member_id: @member.id }
    assert_json_error response.body
  end

  test "POST move renders json" do
    post :move, params: { subscribe_id: @subscription.id, to: @folder.name }, session: { member_id: @member.id }
    assert_valid_json response.body
  end

  test "POST move renders error without subscribe_id" do
    post :move, params: { to: @folder.name }, session: { member_id: @member.id }
    assert_json_error response.body
  end

  test "POST set_notify renders json" do
    post :set_notify, params: { subscribe_id: @subscription.id, ignore: "0" }, session: { member_id: @member.id }
    assert_valid_json response.body
  end

  test "POST set_notify renders error without subscribe_id" do
    post :set_notify, params: { ignore: "0" }, session: { member_id: @member.id }
    assert_json_error response.body
  end

  test "POST set_public renders json" do
    post :set_public, params: { subscribe_id: @subscription.id, public: "0" }, session: { member_id: @member.id }
    assert_valid_json response.body
  end

  test "POST set_public renders error without subscribe_id" do
    post :set_public, params: { public: "0" }, session: { member_id: @member.id }
    assert_json_error response.body
  end

  test "POST fetch_favicon renders json" do
    Feed.stub :find_by, @feed do
      @feed.stub :fetch_favicon!, nil do
        post :fetch_favicon, params: { feedlink: @feed.feedlink }, session: { member_id: @member.id }
        assert_valid_json response.body
      end
    end
  end

  test "not logged in renders blank page for discover" do
    post :discover, params: { url: @feed.feedlink }
    assert response.body.blank?
    assert_response :success
  end

  private

  def assert_valid_json(body)
    JSON.parse(body)
    assert true
  rescue JSON::ParserError
    flunk "Expected valid JSON, got: #{body}"
  end

  def assert_json_error(body)
    json = JSON.parse(body)
    assert_equal false, json["isSuccess"]
  rescue JSON::ParserError
    flunk "Expected valid JSON, got: #{body}"
  end
end
