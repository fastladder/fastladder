require 'spec_helper'

describe SubscribeController do
  before do
    @member = FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala')
  end

  describe 'GET /confirm' do
    it "should search url by FeedSearcher" do
      expect(FeedSearcher).to receive(:search).with('http://example.com') { [] }
      get :confirm, params: { url: 'http://example.com' }, session: { member_id: @member.id }
    end
  end
end
