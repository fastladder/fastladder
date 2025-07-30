require "test_helper"

class UserRoutingTest < ActionDispatch::IntegrationTest
  test "routes :login_name" do
    assert_routing(
      { method: "get", path: "/user/mala" },
      { controller: "user", action: "index", login_name: "mala" }
    )
  end
end
