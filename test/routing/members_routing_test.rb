require "test_helper"

class MembersRoutingTest < ActionDispatch::IntegrationTest
  test "routes member#new" do
    assert_routing(
      { method: "get", path: "/signup" },
      { controller: "members", action: "new" }
    )
  end

  test "routes member#create" do
    assert_routing(
      { method: "post", path: "/members" },
      { controller: "members", action: "create" }
    )
  end
end
