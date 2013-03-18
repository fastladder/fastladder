require 'spec_helper'

describe ApiController do
  before do
    @member = FactoryGirl.create(:member, password: 'mala', password_confirmation: 'mala')
    @feed = FactoryGirl.create(:feed)
    @subscription = FactoryGirl.create(:subscription, feed: @feed, member: @member)
    @crawl_status = FactoryGirl.create(:crawl_status, feed: @feed)
  end

  describe 'GET /all' do
    before {
      @items = Array.new(3) { FactoryGirl.create(:item, feed: @feed) }
    }
    it 'renders json' do
      get :all, { subscribe_id: @subscription.id }, { member_id: @member.id }
      expect(response.body).to be_json
    end
    it 'limit works' do
      get :all, { subscribe_id: @subscription.id, limit: 2 }, { member_id: @member.id }
      expect(JSON.parse(response.body)["items"]).to have(2).items
    end
    it 'offset works' do
      get :all, { subscribe_id: @subscription.id, offset: 1 }, { member_id: @member.id }
      expect(JSON.parse(response.body)["items"][0]).to include("id" => @items[1].id)
      expect(JSON.parse(response.body)["items"][1]).to include("id" => @items[0].id)
    end
  end

  describe 'POST /touch_all' do
    it 'renders json' do
      post :touch_all, { subscribe_id: @subscription.id }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  describe 'POST /touch' do
    it 'renders json' do
      post :touch, { timestamp: Time.now.to_i, subscribe_id: @subscription.id }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  describe 'POST /crawl' do
    it 'renders json' do
      post :crawl, { subscribe_id: @subscription.id }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  describe 'GET /subs' do
    before {
      @unread_subscription = FactoryGirl.create(:unread_subscription, member: @member)
    }
    context 'default' do
      it "has read and unread subscriptions" do
        get :subs, {}, { member_id: @member.id }
        JSON.parse(response.body).count.should == 2
      end
    end
    context 'with unread' do
      it "has only unread subscriptions" do
        get :subs, {unread: 1}, { member_id: @member.id }
        JSON.parse(response.body).count.should == 1
      end
    end
  end

  describe 'GET /lite_subs' do
    it 'renders json' do
      get :lite_subs, {}, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end
end

