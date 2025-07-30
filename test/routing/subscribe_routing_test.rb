require "test_helper"

class SubscribeRoutingTest < ActionDispatch::IntegrationTest
  test "routes subscribe#confirm" do
    assert_routing(
      { method: "get", path: "/subscribe/http://example.com/index.xml" },
      { controller: "subscribe", action: "confirm", url: "http://example.com/index.xml" }
    )
  end
end
