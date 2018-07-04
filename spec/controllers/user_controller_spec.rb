require 'spec_helper'

describe UserController do

  let :member do
    FactoryBot.create(:member, username: 'bulkneets', password: 'mala', password_confirmation: 'mala')
  end

  let :rss_mime_type do
    Mime::Type.lookup_by_extension(:rss).to_s
  end

  let :opml_mime_type do
    Mime::Type.lookup_by_extension(:opml).to_s
  end

  describe 'GET /' do
    it 'renders the index template' do
      get :index, login_name: member.username
      expect(response).to be_success
      expect(response).to render_template('index')
    end

    it 'renders rss' do
      request.accept = rss_mime_type
      get :index, login_name: member.username
      expect(response).to be_success
      expect(response).to render_template('index')
      expect(response.content_type).to eq(rss_mime_type)
    end

    it 'renders opml' do
      request.accept = opml_mime_type
      get :index, login_name: member.username
      expect(response).to be_success
      expect(response).to render_template('index')
      expect(response.content_type).to eq(opml_mime_type)
    end
  end
end
