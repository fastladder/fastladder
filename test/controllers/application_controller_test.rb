require "test_helper"

class TestApplicationController < ApplicationController
  before_action :login_required, only: [:test_login_required]
  before_action :current_member, only: [:test_current_member]

  def test_login_required
    head 200
  end

  def test_current_member
    head 200
  end
end

class ApplicationControllerTest < ActionController::TestCase
  tests TestApplicationController

  def setup
    @member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
    Rails.application.routes.draw do
      get "test_login_required", to: "test_application#test_login_required"
      get "test_current_member", to: "test_application#test_current_member"
      get "login", to: "sessions#new", as: :login
    end
  end

  def teardown
    Rails.application.reload_routes!
  end

  test "login_required with session member_id renders 200" do
    get :test_login_required, session: { member_id: @member.id }
    assert_response :success
  end

  test "login_required with auth_key renders 200" do
    @member.set_auth_key
    get :test_login_required, params: { auth_key: @member.auth_key }
    assert_response :success
  end

  test "login_required without member redirects to login_path" do
    get :test_login_required
    assert_redirected_to login_path
  end

  test "current_member with existing member assigns @member" do
    get :test_current_member, session: { member_id: @member.id }
    assert_not_nil assigns(:member)
  end

  test "current_member without member does not assign @member" do
    get :test_current_member
    assert_nil assigns(:member)
  end

  test "url_from_path extracts URL from request-path" do
    controller = TestApplicationController.new
    request_mock = ActionDispatch::TestRequest.new({})
    request_mock.instance_variable_set(:@original_fullpath, "/url/http://example.com")

    controller.instance_variable_set(:@_request, request_mock)
    controller.instance_variable_set(:@_params, ActionController::Parameters.new(url: nil))

    controller.stub :url_for, "/url/." do
      result = controller.url_from_path(:url)
      assert_equal "http://example.com", result
    end
  end

  test "json_status with success returns correct format" do
    result = ApplicationController.json_status(true)
    parsed = JSON.parse(result)
    assert_equal true, parsed["isSuccess"]
    assert_equal 0, parsed["ErrorCode"]
  end

  test "json_status with failure returns correct format" do
    result = ApplicationController.json_status(false)
    parsed = JSON.parse(result)
    assert_equal false, parsed["isSuccess"]
    assert_equal 1, parsed["ErrorCode"]
  end

  test "json_status with custom error code" do
    result = ApplicationController.json_status(false, 99)
    parsed = JSON.parse(result)
    assert_equal false, parsed["isSuccess"]
    assert_equal 99, parsed["ErrorCode"]
  end

  test "json_status with hash option merges correctly" do
    result = ApplicationController.json_status(true, { data: "test" })
    parsed = JSON.parse(result)
    assert_equal true, parsed["isSuccess"]
    assert_equal 0, parsed["ErrorCode"]
    assert_equal "test", parsed["data"]
  end
end
