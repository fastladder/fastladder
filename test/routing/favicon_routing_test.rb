require "test_helper"

class FaviconRoutingTest < ActionDispatch::IntegrationTest
  test "routes favicon#get" do
    assert_routing(
      { method: "get", path: "/favicon/http://example.com/" },
      { controller: "favicon", action: "get", feed: "http://example.com/" }
    )
  end
end
