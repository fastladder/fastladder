require "test_helper"

class SubscribeControllerTest < ActionController::TestCase
  def setup
    @member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
  end

  test "GET confirm searches url by FeedSearcher" do
    FeedSearcher.stub :search, [] do
      get :confirm, params: { url: "http://example.com" }, session: { member_id: @member.id }
      assert_response :redirect
    end
  end
end
