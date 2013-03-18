require 'spec_helper'

describe ApiController do
  before do
    @member = FactoryGirl.create(:member, password: 'mala', password_confirmation: 'mala')
    @feed = FactoryGirl.create(:feed)
    @subscription = FactoryGirl.create(:subscription, feed: @feed, member: @member)
    @crawl_status = FactoryGirl.create(:crawl_status, feed: @feed)
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
end
