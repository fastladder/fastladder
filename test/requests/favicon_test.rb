require "test_helper"

class FaviconRequestTest < ActionDispatch::IntegrationTest
  test "GET /favicon/:url returns favicon" do
    feed = FactoryBot.create(:feed)

    Feed.stub(:find_by, feed) do
      get "/favicon/#{feed.link}"

      assert_response :ok
      assert_equal "image/png", @response.media_type
    end
  end
end
