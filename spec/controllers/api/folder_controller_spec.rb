# -*- coding: utf-8 -*-
require 'spec_helper'

describe Api::FolderController do
  before do
    @member = FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala')
    @folder = FactoryBot.create(:folder)
  end

  describe 'POST /create' do
    it 'creates new folder' do
      expect {
        post :create, params: { name: '便利情報' }, session: { member_id: @member.id }
      }.to change {
        Folder.count
      }.by(1)
    end

    it 'renders json' do
      post :create, params: { name: '便利情報' }, session: { member_id: @member.id }
      expect(response.body).to be_json
    end

    it 'renders error' do
      post :create, session: { member_id: @member.id }
      expect(response.body).to be_json_error
    end
  end

  describe 'POST /delete' do
    it 'renders json' do
      post :delete, params: { folder_id: @folder.id }, session: { member_id: @member.id }
      expect(response.body).to be_json
    end

    it 'renders error' do
      post :delete, session: { member_id: @member.id }
      expect(response.body).to be_json_error
    end
  end

  describe 'POST /update' do
    it 'renders json' do
      post :update, params: { folder_id: @folder.id, name: 'Life Hack' }, session: { member_id: @member.id }
      expect(response.body).to be_json
    end

    it 'renders error' do
      post :update, session: { member_id: @member.id }
      expect(response.body).to be_json_error
    end
  end

  context 'not logged in' do
    it 'renders blank' do
      post :update
      expect(response.body).to be_blank
    end
  end
end
