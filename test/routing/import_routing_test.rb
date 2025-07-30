require "test_helper"

class ImportRoutingTest < ActionDispatch::IntegrationTest
  test "routes import#fetch" do
    assert_routing(
      { method: "get", path: "/import/http://example.com/" },
      { controller: "import", action: "fetch", url: "http://example.com/" }
    )
  end

  test "routes import#finish" do
    assert_routing(
      { method: "post", path: "/import/finish" },
      { controller: "import", action: "finish" }
    )
  end
end
