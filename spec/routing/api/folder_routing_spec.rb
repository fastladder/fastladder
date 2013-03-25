require 'spec_helper'

describe 'routing to api/folder' do
  %w(create update delete).each do|name|
    it "routes #{name}" do
      expect(post("/api/folder/#{name}")).to route_to(controller: 'api/folder', action: name)
    end

    it "routes nothing" do
      expect(get("/api/folder/#{name}")).to route_to(controller: 'application', action: 'nothing', _: "folder/#{name}")
    end
  end
end
