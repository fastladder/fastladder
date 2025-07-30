require "test_helper"

class UserControllerTest < ActionController::TestCase
  def setup
    @member = FactoryBot.create(:member, username: "bulkneets", password: "mala", password_confirmation: "mala")
    @rss_mime_type = Mime::Type.lookup_by_extension(:rss).to_s
    @opml_mime_type = Mime::Type.lookup_by_extension(:opml).to_s
  end

  test "GET index renders the index template" do
    get :index, params: { login_name: @member.username }
    assert_response :success
    assert_template "index"
  end

  test "GET index responds to different mime types" do
    get :index, params: { login_name: @member.username }
    assert_response :success
  end
end
