require 'spec_helper'

describe 'routing to api/config' do
  it 'routes load' do
    expect(get('/api/config/load')).to route_to('api/config#getter')
  end

  it 'routes save' do
    expect(post('/api/config/save')).to route_to('api/config#setter')
  end
end
