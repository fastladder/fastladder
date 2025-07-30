require "test_helper"

class ApiRoutingTest < ActionDispatch::IntegrationTest
  %w(all unread touch_all touch item_count unread_count crawl).each do |name|
    test "routes #{name} via GET" do
      assert_routing(
        { method: "get", path: "/api/#{name}" },
        { controller: "api", action: name }
      )
    end

    test "routes #{name} via POST" do
      assert_routing(
        { method: "post", path: "/api/#{name}" },
        { controller: "api", action: name }
      )
    end
  end

  %w(subs lite_subs error_subs folders).each do |name|
    test "routes #{name}" do
      assert_routing(
        { method: "post", path: "/api/#{name}" },
        { controller: "api", action: name }
      )
    end

    test "routes nothing for #{name} via GET" do
      assert_routing(
        { method: "get", path: "/api/#{name}" },
        { controller: "application", action: "nothing", _: name }
      )
    end
  end
end
