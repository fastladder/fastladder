# -*- coding: utf-8 -*-
require 'spec_helper'

describe RpcController do
  let(:member) { FactoryGirl.create(:member, password: 'mala', password_confirmation: 'mala') }

  before do
    member.set_auth_key
    Member.any_instance.stub(:subscribe_feed).and_return(FactoryGirl.create(:subscription))
  end

  describe 'POST /update_feed' do
    let(:params) { FactoryGirl.attributes_for(:item) }

    it 'renders json' do
      post :update_feed, params.merge(api_key: member.auth_key)
      expect(response.body).to be_json
    end

    it 'creates new item' do
      expect {
        post :update_feed, params.merge(api_key: member.auth_key)
      }.to change {
        Item.count
      }.by(1)
    end

    context 'Not Feed' do
      let(:params){FactoryGirl.attributes_for(:item).slice(:link, :title, :body, :author, :category, :published_date).merge( feedtitle: 'malamalamala', api_key: member.auth_key, feedlink: 'http://ma.la')}
      it 'creates new item' do
        expect {
          post :update_feed, params.merge(api_key: member.auth_key)
        }.to change {
          Item.count
        }.by(1)
      end
    end

    context 'JSON-RPC' do
      let(:params){ { api_key: member.auth_key } }
      let(:json) { FactoryGirl.attributes_for(:item).slice(:link, :title, :body, :author, :category, :published_date).to_json }
      it 'creates new item' do
        expect {
          post :update_feed, params.merge(json: json)
        }.to change {
          Item.count
        }.by(1)
      end
    end

    context 'Not-Feed ON JSON RPC' do
      let(:params) { {api_key: member.auth_key} }
      let(:json) { FactoryGirl.attributes_for(:item).slice(:link, :title, :body, :author, :category, :published_date).merge( feedtitle: 'malamalamala', feedlink: 'http://ma.la').to_json }
      it 'creates new item' do
        expect {
          post :update_feed, params.merge(json: json)
        }.to change {
          Item.count
        }.by(1)
      end
    end
  end
end
