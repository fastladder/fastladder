require 'spec_helper'

describe 'routing to members' do
  it 'routes member#new' do
    expect(get('/signup')).to route_to('members#new')
  end

  it 'routes member#create' do
    expect(post('/members')).to route_to('members#create')
  end
end
