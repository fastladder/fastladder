require 'spec_helper'

describe 'routing to import' do
  it 'routes import#fetch' do
    expect(get('/import/http://example.com/')).
      to route_to(controller: 'import', action: 'fetch', url: 'http://example.com/')
  end

  it 'routes import#finish' do
    expect(post('/import/finish')).
      to route_to(controller: 'import', action: 'finish')
  end
end
