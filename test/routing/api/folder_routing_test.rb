require "test_helper"

class Api::FolderRoutingTest < ActionDispatch::IntegrationTest
  %w(create update delete).each do |name|
    test "routes #{name}" do
      assert_routing(
        { method: "post", path: "/api/folder/#{name}" },
        { controller: "api/folder", action: name }
      )
    end

    test "routes nothing for #{name} via GET" do
      assert_routing(
        { method: "get", path: "/api/folder/#{name}" },
        { controller: "application", action: "nothing", _: "folder/#{name}" }
      )
    end
  end
end
