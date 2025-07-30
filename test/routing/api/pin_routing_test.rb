require "test_helper"

class Api::PinRoutingTest < ActionDispatch::IntegrationTest
  %w(all add remove clear).each do |name|
    test "routes #{name}" do
      assert_routing(
        { method: "post", path: "/api/pin/#{name}" },
        { controller: "api/pin", action: name }
      )
    end

    test "routes nothing for #{name} via GET" do
      assert_routing(
        { method: "get", path: "/api/pin/#{name}" },
        { controller: "application", action: "nothing", _: "pin/#{name}" }
      )
    end
  end
end
