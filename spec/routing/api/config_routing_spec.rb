require 'spec_helper'

describe 'routing to api/config' do
  describe '#load' do
    it 'routes load via GET' do
      expect(get('/api/config/load')).to route_to('api/config#getter')
    end

    it 'routes load via POST' do
      expect(post('/api/config/load')).to route_to('api/config#getter')
    end
  end

  describe '#save' do
    it 'routes nothnig' do
      expect(get('/api/config/save')).to route_to('application#nothing', _: 'config/save')
    end

    it 'routes save' do
      expect(post('/api/config/save')).to route_to('api/config#setter')
    end
  end
end
