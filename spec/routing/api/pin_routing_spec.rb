require 'spec_helper'

describe 'routing to api/pin' do
  %w(all add remove clear).each do|name|
    it "routes #{name}" do
      expect(post("/api/pin/#{name}")).to route_to("api/pin\##{name}")
    end
  end
end
