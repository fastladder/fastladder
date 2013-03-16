require 'spec_helper'

describe 'routing to api/folder' do
  %w(create update delete).each do|name|
    it "routes #{name}" do
      expect(post("/api/folder/#{name}")).to route_to("api/folder\##{name}")
    end
  end
end
