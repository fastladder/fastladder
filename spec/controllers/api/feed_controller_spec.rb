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
      post :discover, { url: @feed.link }, { member_id: @member.id }
      expect(response.body).to be_json
    end

    context 'no rss auto discovery links' do
      before do
        Rfeedfinder.stub(:feeds).and_return([])
      end

      it 'renders json of empty array' do
        post :discover, { url: @feed.link }, { member_id: @member.id }
        expect(JSON.parse(response.body).size).to eq(0)
      end
    end

    context '1 rss auto discovery link' do
      before do
        Rfeedfinder.stub(:feeds).and_return(['http://feeds.feedburner.com/mala/blog/'])
      end

      it 'renders json of 1 feed' do
        post :discover, { url: @feed.link }, { member_id: @member.id }
        expect(JSON.parse(response.body).size).to eq(1)
      end
    end

    context '2 rss auto discovery links' do
      before do
        Rfeedfinder.stub(:feeds).and_return(['http://feeds.feedburner.com/mala/blog/', 'http://feeds.bulknews.net/bulknews'])
      end

      it 'renders json of 2 feeds' do
        post :discover, { url: @feed.link }, { member_id: @member.id }
        expect(JSON.parse(response.body).size).to eq(2)
      end
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
