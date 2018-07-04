require 'spec_helper'

describe AboutController do
  before do
    @feed = FactoryBot.create(:feed)
  end

  describe 'GET /' do
    context 'exists url' do
      before do
        allow(Feed).to receive(:find_by).with(feedlink: @feed.link) { @feed }
        get :index, url: @feed.link
      end

      it 'assign feed' do
        expect(assigns[:feed]).to eq(@feed)
      end

      it 'assing feed' do
        expect(assigns[:is_feedlink]).to eq(true)
      end
    end

    context 'non-exists url' do
      before do
        get :index, url: 'http://example.com/unknown'
      end

      it 'return 404' do
        expect(response.status).to eq(404)
      end
    end
  end
end
