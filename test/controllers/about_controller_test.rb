require "test_helper"

class AboutControllerTest < ActionController::TestCase
  test "GET index with existing url assigns feed" do
    feed = FactoryBot.create(:feed)
    # faviconを作成してfeedに関連付け
    favicon = Favicon.create(feed: feed, image: "dummy")
    feed.update(favicon: favicon)

    Feed.stub :find_by, feed do
      get :index, params: { url: feed.link }
      assert_response :success
      assert_equal feed, assigns[:feed]
      assert_equal true, assigns[:is_feedlink]
    end
  end

  test "GET index with non-existing url returns 404" do
    get :index, params: { url: "http://example.com/unknown" }
    assert_equal 404, response.status
  end
end
