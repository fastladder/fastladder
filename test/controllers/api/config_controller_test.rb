require "test_helper"

class Api::ConfigControllerTest < ActionController::TestCase
  def setup
    @member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala", config_dump: { "use_wait" => "0" })
  end

  test "getter renders json when logged in" do
    get :getter, session: { member_id: @member.id }
    json = ActiveSupport::JSON.decode(response.body)
    assert_includes json, "use_wait"
    assert_equal "0", json["use_wait"]
    assert_includes json, "save_pin_limit"
    assert_equal Settings.save_pin_limit, json["save_pin_limit"]
  end

  test "getter renders app config when stored config has the same key" do
    @member.update!(config_dump: { "use_wait" => "0", "save_pin_limit" => "1" })
    get :getter, session: { member_id: @member.id }
    assert_response :success
    json = ActiveSupport::JSON.decode(response.body)
    assert_equal Settings.save_pin_limit, json["save_pin_limit"]
  end

  test "setter does not store app config" do
    post :setter, params: { use_wait: 42, save_pin_limit: 1 }, session: { member_id: @member.id }
    assert_not_includes Member.find(@member.id).config_dump, "save_pin_limit"
  end

  test "setter updates member when logged in" do
    assert_changes -> { Member.find(@member.id).config_dump["use_wait"].to_i }, from: 0, to: 42 do
      post :setter, params: { use_wait: 42 }, session: { member_id: @member.id }
    end
  end

  test "setter renders json when logged in" do
    post :setter, params: { use_wait: 42 }, session: { member_id: @member.id }
    json = ActiveSupport::JSON.decode(response.body)
    assert_includes json, "use_wait"
    assert_equal "42", json["use_wait"]
  end

  test "getter renders empty when not logged in" do
    get :getter
    assert response.body.blank?
  end

  test "setter renders empty when not logged in" do
    post :setter, params: { use_wait: 42 }
    assert response.body.blank?
  end

  test "setter does not change value when not logged in" do
    assert_no_changes -> { Member.find(@member.id).config_dump["use_wait"] } do
      post :setter, params: { use_wait: 42 }
    end
  end
end
