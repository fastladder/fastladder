require 'spec_helper'

describe 'routing to icon' do
  it 'routes icon#get' do
    expect(get('/favicon/http://example.com/')).
      to route_to(controller: 'icon', action: 'get', feed: 'http://example.com/')
  end
end

