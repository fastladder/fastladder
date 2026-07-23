require "test_helper"

class AboutRoutingTest < ActionDispatch::IntegrationTest
  test "routes about#index" do
    assert_routing(
      { method: "get", path: "/about/http://example.com/index.xml" },
      { controller: "about", action: "index", url: "http://example.com/index.xml" }
    )
  end

  test "routes about#update" do
    assert_routing(
      { method: "post", path: "/about/http://example.com/index.xml" },
      { controller: "about", action: "update", url: "http://example.com/index.xml" }
    )
  end
end
