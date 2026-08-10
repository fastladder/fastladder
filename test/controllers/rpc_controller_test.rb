require "test_helper"

class RpcControllerTest < ActionController::TestCase
  def setup
    @member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
    @member.set_auth_key
    @member.save!
    @feed = FactoryBot.create(:feed)
    @item = FactoryBot.create(:item, feed: @feed)
  end

  test "controller exists" do
    assert RpcController
  end

  test "POST check_digest returns only unknown digests" do
    unknown = Digest::SHA1.hexdigest("unknown")

    post :check_digest, params: { api_key: @member.auth_key, digests: [@item.digest, unknown].to_json }

    assert_equal [unknown], JSON.parse(response.body)
  end

  test "POST check_digest treats digests as values, not SQL" do
    payload = "' OR 1=1 --"

    post :check_digest, params: { api_key: @member.auth_key, digests: [payload].to_json }

    assert_response :success
    assert_equal [payload], JSON.parse(response.body)
  end
end
