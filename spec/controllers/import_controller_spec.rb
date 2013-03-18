require 'spec_helper'

describe ImportController do
  before do
    @member = FactoryGirl.create(:member, password: 'mala', password_confirmation: 'mala')
  end

  describe 'GET /import' do
    it "fetch url" do
      Fastladder.should_receive(:simple_fetch).with('http://example.com') { '<opml/>' }
      get :fetch, { url: 'http://example.com' }, { member_id: @member.id }
    end
  end
end
