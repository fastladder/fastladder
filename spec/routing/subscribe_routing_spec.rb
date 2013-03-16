require 'spec_helper'

describe 'routing to subscribe' do
  it 'routes subscribe#confirm' do
    expect(get('/subscribe/http://example.com/index.xml')).
      to route_to(controller: "subscribe", action: "confirm", url: "http://example.com/index.xml")
  end
end

