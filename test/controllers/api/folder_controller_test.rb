require "test_helper"

class Api::FolderControllerTest < ActionController::TestCase
  def setup
    @member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
    @folder = FactoryBot.create(:folder)
  end

  test "POST create creates new folder" do
    assert_difference "Folder.count", 1 do
      post :create, params: { name: "便利情報" }, session: { member_id: @member.id }
    end
  end

  test "POST create renders json" do
    post :create, params: { name: "便利情報" }, session: { member_id: @member.id }
    assert_valid_json response.body
  end

  test "POST create renders error without name" do
    post :create, session: { member_id: @member.id }
    assert_json_error response.body
  end

  test "POST delete renders json" do
    post :delete, params: { folder_id: @folder.id }, session: { member_id: @member.id }
    assert_valid_json response.body
  end

  test "POST delete renders error without folder_id" do
    post :delete, session: { member_id: @member.id }
    assert_json_error response.body
  end

  test "POST update renders json" do
    post :update, params: { folder_id: @folder.id, name: "Life Hack" }, session: { member_id: @member.id }
    assert_valid_json response.body
  end

  test "POST update renders error without folder_id" do
    post :update, session: { member_id: @member.id }
    assert_json_error response.body
  end

  test "not logged in renders blank" do
    post :update
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
