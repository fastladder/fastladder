require 'spec_helper'

describe 'routing to api/pin' do
  %w(all add remove clear).each do|name|
    it "routes #{name}" do
      expect(post("/api/pin/#{name}")).to route_to(controller: 'api/pin', action: name)
    end

    it 'routes nothing' do
      expect(get("/api/pin/#{name}")).to route_to('application#nothing', _: "pin/#{name}")
    end
  end
end
