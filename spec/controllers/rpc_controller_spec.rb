# -*- coding: utf-8 -*-
require 'spec_helper'

describe RpcController do
  let(:member) { FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala') }

  before do
    member.set_auth_key
    allow_any_instance_of(Member).to receive(:subscribe_feed).and_return(FactoryBot.create(:subscription))
  end

  describe 'POST /update_feed' do
    let(:params) { FactoryBot.attributes_for(:item) }

    it 'renders json' do
      post :update_feed, { api_key: member.auth_key, json: params.to_json }
      expect(response.body).to be_json
    end

    it 'creates new item' do
      expect {
        post :update_feed, { api_key: member.auth_key, json: params.to_json }
      }.to change {
        Item.count
      }.by(1)
    end

    context 'Not Feed' do
      let(:params){FactoryBot.attributes_for(:item).slice(:link, :title, :body, :author, :category, :published_date).merge( feedtitle: 'malamalamala', api_key: member.auth_key, feedlink: 'http://ma.la')}
      it 'creates new item' do
        expect {
          post :update_feed, { api_key: member.auth_key, json: params.to_json }
        }.to change {
          Item.count
        }.by(1)
      end
    end

    context 'JSON-RPC' do
      let(:params) { FactoryBot.attributes_for(:item).slice(:link, :title, :body, :author, :category, :published_date) }
      it 'creates new item' do
        expect {
          post :update_feed, { api_key: member.auth_key, json: params.to_json }
        }.to change {
          Item.count
        }.by(1)
      end
    end

    context 'Not-Feed ON JSON RPC' do
      let(:params) { FactoryBot.attributes_for(:item).slice(:link, :title, :body, :author, :category, :published_date).merge( feedtitle: 'malamalamala', feedlink: 'http://ma.la') }
      it 'creates new item' do
        expect {
          post :update_feed, { api_key: member.auth_key, json: params.to_json }
        }.to change {
          Item.count
        }.by(1)
      end
    end

    context 'without guid' do
      let(:params) { FactoryBot.attributes_for(:item_without_guid) }

      it 'creates a new item with guid == link' do
        expect {
          post :update_feed, { api_key: member.auth_key, json: params.to_json }
        }.to change {
          Item.find_by(guid: params[:link]).nil?
        }.from(true).to(false)
      end
    end
  end
end
