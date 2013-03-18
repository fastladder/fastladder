require 'spec_helper'

describe AboutController do
  before do
    @feed = FactoryGirl.create(:feed)
  end

  describe 'GET /' do
    context 'exists url' do
      before do
        Feed.stub(:find_by_feedlink) { @feed }
        get :index, url: @feed.link
      end

      it 'assign feed' do
        assigns[:feed].should == @feed
      end

      it 'assing feed' do
        assigns[:is_feedlink].should == true
      end
    end

    context 'non-exists url' do
      before do
        get :index, url: 'http://example.com/unknown'
      end

      it 'return 404' do
        response.status.should == 404
      end
    end
  end
end
