require "test_helper"

class SessionsRoutingTest < ActionDispatch::IntegrationTest
  test "routes to #new" do
    assert_routing(
      { method: "get", path: "/login" },
      { controller: "sessions", action: "new" }
    )
  end

  test "routes to #create" do
    assert_routing(
      { method: "post", path: "/session" },
      { controller: "sessions", action: "create" }
    )
  end

  test "routes to #destroy" do
    assert_routing(
      { method: "get", path: "/logout" },
      { controller: "sessions", action: "destroy" }
    )
  end
end
