require 'spec_helper'

describe FaviconController do
  before do
    @feed = FactoryBot.create(:feed)
  end

  let(:image_header) {
    { filename: 'favicon', type: 'image/png', disposition: 'inline'}
  }

  describe 'GET /' do
    it "should send favicon" do
      expect(Feed).to receive(:find_by).with(feedlink: @feed.link) { @feed }
      expect(controller).to receive(:send_data).with(anything, image_header) {
        @controller.head 200
      }
      get :get, feed: @feed.link
    end
  end
end
