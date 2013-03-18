require 'spec_helper'

describe UserController do

  let :member do
    FactoryGirl.create(:member, username: 'bulkneets', password: 'mala', password_confirmation: 'mala')
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
      expect(response.content_type).to be_equal rss_mime_type
    end

    it 'renders opml' do
      request.accept = opml_mime_type
      get :index, login_name: member.username
      expect(response).to be_success
      expect(response).to render_template('index')
      expect(response.content_type).to be_equal opml_mime_type
    end
  end

  describe 'GET /rss' do
    it 'renders rss' do
      request.accept = rss_mime_type
      get :index, login_name: member.username
      expect(response).to be_success
      expect(response).to render_template('index')
      expect(response.content_type).to be_equal rss_mime_type
    end
  end

  describe 'GET /opml' do
    it 'renders opml' do
      request.accept = opml_mime_type
      get :index, login_name: member.username
      expect(response).to be_success
      expect(response).to render_template('index')
      expect(response.content_type).to be_equal opml_mime_type
    end
  end

end
