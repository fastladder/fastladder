# -*- coding: utf-8 -*-
require 'spec_helper'

describe Api::FolderController do
  before do
    @member = FactoryGirl.create(:member, password: 'mala', password_confirmation: 'mala')
    @folder = FactoryGirl.create(:folder)
  end

  describe 'POST /create' do
    it 'creates new folder' do
      expect {
        post :create, { name: '便利情報' }, { member_id: @member.id }
      }.to change {
        Folder.count
      }.by(1)
    end

    it 'renders json' do
      post :create, { name: '便利情報' }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  describe 'POST /delete' do
    it 'renders json' do
      post :delete, { folder_id: @folder.id }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  describe 'POST /update' do
    it 'renders json' do
      post :update, { folder_id: @folder.id, name: 'Life Hack' }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end
end
