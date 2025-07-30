require "test_helper"

class Api::FeedRoutingTest < ActionDispatch::IntegrationTest
  %w(discover subscribed).each do |name|
    test "routes #{name} via GET" do
      assert_routing(
        { method: "get", path: "/api/feed/#{name}" },
        { controller: "api/feed", action: name }
      )
    end

    test "routes #{name} via POST" do
      assert_routing(
        { method: "post", path: "/api/feed/#{name}" },
        { controller: "api/feed", action: name }
      )
    end
  end

  %w(subscribe unsubscribe update move set_rate set_notify set_public add_tags remove_tags).each do |name|
    test "routes #{name}" do
      assert_routing(
        { method: "post", path: "/api/feed/#{name}" },
        { controller: "api/feed", action: name }
      )
    end

    test "routes nothing for #{name} via GET" do
      assert_routing(
        { method: "get", path: "/api/feed/#{name}" },
        { controller: "application", action: "nothing", _: "feed/#{name}" }
      )
    end
  end
end
