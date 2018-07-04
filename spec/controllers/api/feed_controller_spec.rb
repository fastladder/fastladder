require 'spec_helper'

describe Api::FeedController do
  before do
    @member = FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala')
    @feed = FactoryBot.create(:feed, feedlink: "http://feeds.feedburner.com/mala/blog")
    @subscription = FactoryBot.create(:subscription, feed: @feed, member: @member)
    @folder = FactoryBot.create(:folder, member: @member)
  end

  describe 'POST /discover' do
    before do
      stub_request(:any, 'http://feeds.feedburner.com/mala/blog')
    end

    it 'renders json' do
      post :discover, { url: @feed.feedlink }, { member_id: @member.id }
      expect(response.body).to be_json
    end

    it 'renders error' do
      post :discover, {}, { member_id: @member.id }
      expect(response.body).to be_json_error
    end
  end

  describe 'POST /subscribed' do
    it 'renders json' do
      post :subscribed, { feedlink: @feed.feedlink, subscribe_id: @subscription.id }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  describe 'POST /subscribe' do
    it 'renders json' do
      post :subscribe, { feedlink: @feed.feedlink }, { member_id: @member.id }
      expect(response.body).to be_json
    end

    it 'renders error' do
      post :subscribe, { }, { member_id: @member.id }
      expect(response.body).to be_json_error
    end
  end

  describe 'POST /update' do
    it 'renders json' do
      post :update, { subscribe_id: @subscription.id, folder_id: @folder.id }, { member_id: @member.id }
      expect(response.body).to be_json
    end

    it 'renders error' do
      post :update, { folder_id: @folder.id }, { member_id: @member.id }
      expect(response.body).to be_json_error
    end
  end

  describe 'POST /unsubscribe' do
    it 'renders json' do
      post :unsubscribe, { subscribe_id: @subscription.id, folder_id: @folder.id }, { member_id: @member.id }
      expect(response.body).to be_json
    end

    it 'renders error' do
      post :unsubscribe, { folder_id: @folder.id }, { member_id: @member.id }
      expect(response.body).to be_json_error
    end
  end

  describe 'POST /set_rate' do
    it 'renders json' do
      post :set_rate, { subscribe_id: @subscription.id, rate: 3 }, { member_id: @member.id }
      expect(response.body).to be_json
    end

    it 'renders error' do
      post :set_rate, {  rate: 3 }, { member_id: @member.id }
      expect(response.body).to be_json_error
    end
  end

  describe 'POST /move' do
    it 'renders json' do
      post :move, { subscribe_id: @subscription.id, to: @folder.name }, { member_id: @member.id }
      expect(response.body).to be_json
    end

    it 'renders error' do
      post :move, { to: @folder.name }, { member_id: @member.id }
      expect(response.body).to be_json_error
    end
  end

  describe 'POST /set_notify' do
    it 'renders json' do
      post :set_notify, { subscribe_id: @subscription.id, ignore: '0' }, { member_id: @member.id }
      expect(response.body).to be_json
    end

    it 'renders error' do
      post :set_notify, {  ignore: '0' }, { member_id: @member.id }
      expect(response.body).to be_json_error
    end
  end

  describe 'POST /set_public' do
    it 'renders json' do
      post :set_public, { subscribe_id: @subscription.id, public: '0' }, { member_id: @member.id }
      expect(response.body).to be_json
    end

    it 'renders json' do
      post :set_public, { public: '0' }, { member_id: @member.id }
      expect(response.body).to be_json_error
    end
  end

  describe 'POST /fetch_favicon' do
    it 'renders json' do
      allow(Feed).to receive(:find_by).with(feedlink: @feed.feedlink).and_return(@feed)
      expect(@feed).to receive(:fetch_favicon!)
      post :fetch_favicon, { feedlink: @feed.feedlink }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  context 'not login' do
    it 'renders blank page' do
      post :discover, { url: @feed.feedlink }
      expect(response.body).to be_blank
    end

    it 'renders blank page' do
      post :discover, { url: @feed.feedlink }
      expect(response).to be_success
    end
  end
end
