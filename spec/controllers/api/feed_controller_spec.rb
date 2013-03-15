require 'spec_helper'

describe Api::FeedController do
  before do
    @member = Factory(:member, password: 'mala', password_confirmation: 'mala')
    @feed = Factory(:feed, feedlink: "http://feeds.feedburner.com/mala/blog")
    @subscription = Factory(:subscription, feed: @feed, member: @member)
    @folder = Factory(:folder, member: @member)
  end

  describe 'POST /discover' do
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
end
