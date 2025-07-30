require "test_helper"

class FaviconControllerTest < ActionController::TestCase
  def setup
    @feed = FactoryBot.create(:feed)
    favicon = Favicon.create(feed: @feed, image: "dummy_image_data")
    @feed.update(favicon: favicon)
  end

  test "GET get should send favicon with existing favicon" do
    get :get, params: { feed: @feed.feedlink }
    assert_response :success
    assert_equal "image/png", response.content_type
    assert_includes response.headers["Content-Disposition"], "inline"
    assert_includes response.headers["Content-Disposition"], "favicon"
  end

  test "GET get should send default favicon when feed has no favicon" do
    @feed.favicon.destroy if @feed.favicon
    @feed.reload
    get :get, params: { feed: @feed.feedlink }
    assert_response :success
    assert_equal "image/png", response.content_type
  end

  test "GET get should send default favicon when feed not found" do
    get :get, params: { feed: "nonexistent" }
    assert_response :success
    assert_equal "image/png", response.content_type
  end
end
