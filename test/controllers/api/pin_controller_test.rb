require "test_helper"

class Api::PinControllerTest < ActionController::TestCase
  def setup
    @member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
  end

  test "POST all renders json" do
    3.times { FactoryBot.create(:pin, member: @member) }
    post :all, session: { member_id: @member.id }
    assert_valid_json response.body
  end

  test "POST all renders purified link" do
    FactoryBot.create(:pin, member: @member, link: "http://www.example.com/get?x=1&y=2")
    post :all, session: { member_id: @member.id }
    json = JSON.parse(response.body)
    assert_includes json.last["link"], "&amp;"
  end

  test "POST add renders json" do
    post :add, params: { link: "http://la.ma.la/blog/diary_200810292006.htm", title: "近況" }, session: { member_id: @member.id }
    assert_valid_json response.body
  end

  test "POST add renders error without link" do
    post :add, session: { member_id: @member.id }
    error = { "isSuccess" => false, "ErrorCode" => 1 }
    assert_equal error, JSON.parse(response.body)
  end

  test "POST remove renders json" do
    post :remove, params: { link: "http://la.ma.la/blog/diary_200810292006.htm" }, session: { member_id: @member.id }
    assert_valid_json response.body
  end

  test "POST remove renders error without link" do
    post :remove, session: { member_id: @member.id }
    assert_json_error response.body
  end

  test "POST remove returns error code when pin not found" do
    post :remove, params: { link: "http://la.ma.la/blog/diary_200810292006.htm" }, session: { member_id: @member.id }
    json = JSON.parse(response.body)
    assert_includes json, "ErrorCode"
    assert_equal Api::PinController::ErrorCode::NOT_FOUND, json["ErrorCode"]
  end

  test "POST remove returns success when pin exists" do
    link = "http://la.ma.la/blog/diary_200810292006.htm"
    FactoryBot.create(:pin, member: @member, link: link)
    post :remove, params: { link: link }, session: { member_id: @member.id }
    json = JSON.parse(response.body)
    assert_includes json, "isSuccess"
    assert_equal true, json["isSuccess"]
  end

  test "POST clear renders json" do
    FactoryBot.create(:pin, member: @member)
    post :clear, session: { member_id: @member.id }
    assert_valid_json response.body
  end

  test "POST clear deletes all pins" do
    FactoryBot.create(:pin, member: @member)
    assert_changes -> { @member.pins.count }, from: 1, to: 0 do
      post :clear, session: { member_id: @member.id }
    end
  end

  test "not logged in renders blank" do
    post :clear
    assert response.body.blank?
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
