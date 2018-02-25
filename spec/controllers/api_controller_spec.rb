require 'spec_helper'

describe ApiController do
  before do
    @member = FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala')
    @feed = FactoryBot.create(:feed)
    @item = FactoryBot.create(:item, feed: @feed)
    @subscription = FactoryBot.create(:subscription, feed: @feed, member: @member)
    @crawl_status = FactoryBot.create(:crawl_status, feed: @feed)
  end

  describe 'GET /all' do
    before {
      @items = Array.new(3) { FactoryBot.create(:item, feed: @feed) }
    }
    it 'renders json' do
      get :all, { subscribe_id: @subscription.id }, { member_id: @member.id }
      expect(response.body).to be_json
    end
    it 'limit works' do
      get :all, { subscribe_id: @subscription.id, limit: 2 }, { member_id: @member.id }
      expect(JSON.parse(response.body)["items"].size).to eq(2)
    end
    it 'offset works' do
      get :all, { subscribe_id: @subscription.id, offset: 1 }, { member_id: @member.id }
      expect(JSON.parse(response.body)["items"][0]).to include("id" => @items[1].id)
      expect(JSON.parse(response.body)["items"][1]).to include("id" => @items[0].id)
    end

    it 'renders purified link' do
      feed = FactoryBot.create :feed
      item = FactoryBot.create :item, feed: feed, link: 'http://www.example.com/get?x=1&y=2'
      subscription = FactoryBot.create :subscription, feed: feed, member: @member
      get :all, { subscribe_id: subscription.id }, { member_id: @member.id }
      expect(JSON.parse(response.body)['items'].first['link']).to include('&amp;')
    end
  end

  describe 'POST /touch_all' do
    it 'renders json' do
      post :touch_all, { subscribe_id: @subscription.id }, { member_id: @member.id }
      expect(response.body).to be_json
    end

    it 'reders error' do
      post :touch_all, {}, { member_id: @member.id }
      expect(response.body).to be_json_error
    end
  end

  describe 'POST /touch' do
    it 'renders json' do
      post :touch, { timestamp: Time.now.to_i, subscribe_id: @subscription.id }, { member_id: @member.id }
      expect(response.body).to be_json
    end

    it 'renders error' do
      post :touch, {}, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  describe 'POST /crawl' do
    let(:headers) {
      { 'Accept' => 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5',
        'Accept-Encoding' => 'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent' => 'Fastladder FeedFetcher/0.0.3 (http://fastladder.org/)'
      }
    }

    before do
      stub_request(:get, %r[http://feeds.feedburner.com/mala/blog/]).with { |request|
        request.headers = headers
      }.to_return(status: 200, body: '', headers: {})
    end

    it 'renders json' do
      post :crawl, { subscribe_id: @subscription.id }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  describe 'GET /subs' do
    before {
      @unread_subscription = FactoryBot.create(:unread_subscription, member: @member)
    }
    context 'default' do
      it "has read and unread subscriptions" do
        get :subs, {}, { member_id: @member.id }
        expect(JSON.parse(response.body).count).to eq(2)
      end
    end
    context 'with unread' do
      it "has only unread subscriptions" do
        get :subs, {unread: 1}, { member_id: @member.id }
        expect(JSON.parse(response.body).count).to eq(1)
      end
    end
  end

  describe 'GET /lite_subs' do
    it 'renders json' do
      get :lite_subs, {}, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  describe 'GET /item_count' do
    it 'renders json' do
      get :item_count, { since: @item.stored_on - 1.second }, { member_id: @member.id }
      expect(response.body.to_i).to eq(1)
    end

    it 'renders error' do
      get :item_count, {}, { member_id: @member.id }
      expect(response.body).to be_json_error
    end
  end

  describe 'GET /unread_count' do
    it 'renders json' do
      get :unread_count, { since: @item.stored_on }, { member_id: @member.id }
      expect(response.body.to_i).to eq(0)
    end

    it 'renders error' do
      get :unread_count, {}, { member_id: @member.id }
      expect(response.body).to be_json_error
    end
  end

  context 'not logged in' do
    it 'renders blank' do
      get :subs, {}, {}
      expect(response.body).to be_blank
    end
  end
end
