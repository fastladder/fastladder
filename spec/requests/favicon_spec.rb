require 'spec_helper'

describe 'favicon' do
  describe 'GET /favicon/:url' do
    let!(:feed) { FactoryBot.create(:feed) }

    it 'returns favicon' do
      expect(Feed).to receive(:find_by).with(feedlink: feed.link).and_call_original
      get "/favicon/#{feed.link}"
      expect(response).to be_ok
      expect(response.content_type).to eq('image/png')
    end
  end
end
