require "test_helper"

class Api::ItemRoutingTest < ActionDispatch::IntegrationTest
  %w(all add remove clear).each do |name|
    test "routes #{name}" do
      assert_routing(
        { method: "post", path: "/api/pin/#{name}" },
        { controller: "api/pin", action: name }
      )
    end
  end
end
