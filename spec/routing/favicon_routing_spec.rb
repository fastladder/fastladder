require 'spec_helper'

describe 'routing to icon' do
  it 'routes favicon#get' do
    expect(get('/favicon/http://example.com/')).
      to route_to(controller: 'favicon', action: 'get', feed: 'http://example.com/')
  end
end

