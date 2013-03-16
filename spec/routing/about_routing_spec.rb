require 'spec_helper'

describe 'routing to about' do
  it 'routes about#index' do
    expect(get('/about/http://example.com/index.xml')).
      to route_to(controller: "about", action: "index", url: "http://example.com/index.xml")
  end
end

