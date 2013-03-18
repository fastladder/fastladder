require 'spec_helper'

describe Api::FeedController do
  before do
    @member = FactoryGirl.create(:member, password: 'mala', password_confirmation: 'mala')
    @feed = FactoryGirl.create(:feed, feedlink: "http://feeds.feedburner.com/mala/blog")
    @subscription = FactoryGirl.create(:subscription, feed: @feed, member: @member)
    @folder = FactoryGirl.create(:folder, member: @member)
  end

  describe 'POST /discover' do
    before do
      stub_request(:any, 'http://feeds.feedburner.com/mala/blog')
    end

    it 'renders json' do
      post :discover, { url: @feed.feedlink }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  describe 'POST /subscribed' do
    it 'renders json' do
      post :subscribed, { feedlink: @feed.feedlink, subscribe_id: @subscription.id }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  describe 'POST /update' do
    it 'renders json' do
      post :update, { subscribe_id: @subscription.id, folder_id: @folder.id }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  describe 'POST /move' do
    it 'renders json' do
      post :move, { to: @folder.name }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  describe 'POST /set_notify' do
    it 'renders json' do
      post :set_notify, { subscribe_id: @subscription.id, ignore: '0' }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  describe 'POST /set_public' do
    it 'renders json' do
      post :set_public, { subscribe_id: @subscription.id, public: '0' }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  describe 'POST /fetch_favicon' do
    it 'renders json' do
      Feed.stub(:find_by_feedlink).with(@feed.feedlink).and_return(@feed)
      @feed.should_receive(:fetch_favicon!)
      post :fetch_favicon, { feedlink: @feed.feedlink }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end
end
