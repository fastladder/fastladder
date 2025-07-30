require "test_helper"

class Api::ConfigRoutingTest < ActionDispatch::IntegrationTest
  test "routes load via GET" do
    assert_routing(
      { method: "get", path: "/api/config/load" },
      { controller: "api/config", action: "getter" }
    )
  end

  test "routes load via POST" do
    assert_routing(
      { method: "post", path: "/api/config/load" },
      { controller: "api/config", action: "getter" }
    )
  end

  test "routes nothing for save via GET" do
    assert_routing(
      { method: "get", path: "/api/config/save" },
      { controller: "application", action: "nothing", _: "config/save" }
    )
  end

  test "routes save" do
    assert_routing(
      { method: "post", path: "/api/config/save" },
      { controller: "api/config", action: "setter" }
    )
  end
end
