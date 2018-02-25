require 'spec_helper'

describe ImportController do
  before do
    @member = FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala')
  end

  describe 'POST /import' do
    it "fetch url" do
      expect(Fastladder).to receive(:simple_fetch).with('http://example.com') { '<opml/>' }
      post :fetch, { url: 'http://example.com' }, { member_id: @member.id }
    end

    context "assigns" do
      include_context(:use_stub_opml)
      it "assigns folder" do
        post :fetch, { url: 'http://example.com' }, { member_id: @member.id }
        expect(assigns[:folders].keys).to include("Subscriptions")
      end
      it "assigns item" do
        post :fetch, { url: 'http://example.com' }, { member_id: @member.id }
        item = assigns[:folders]["Subscriptions"][0]
        expect(item).to include(title: "Recent Commits to fastladder:master")
        expect(item).to include(link: "https://github.com/fastladder/fastladder/commits/master")
        expect(item).to include(feedlink: "https://github.com/fastladder/fastladder/commits/master.atom")
        expect(item).to include(subscribed: false)
      end
    end
  end
end
