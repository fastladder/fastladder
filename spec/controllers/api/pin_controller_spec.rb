# -*- coding: utf-8 -*-
require 'spec_helper'

describe Api::PinController do
  before do
    @member = FactoryGirl.create(:member, password: 'mala', password_confirmation: 'mala')
  end

  let(:error) do
    { 'isSuccess' => false, 'ErrorCode' => 1 }.to_json
  end

  describe 'POST /add' do
    it 'renders json' do
      post :add, { link: 'http://la.ma.la/blog/diary_200810292006.htm', title: '近況' }, { member_id: @member.id }
      expect(response.body).to be_json
    end

    it 'renders error' do
      post :add, {}, { member_id: @member.id }
      expect(response.body).to eq(error)
    end
  end

  describe 'POST /remove' do
    it 'renders json' do
      post :remove, { link: 'http://la.ma.la/blog/diary_200810292006.htm' }, { member_id: @member.id }
      expect(response.body).to be_json
    end

    it 'renders error' do
      post :remove, {}, { member_id: @member.id }
      expect(response.body).to be_json_error
    end
  end

  describe 'POST /clear' do
    it 'renders json' do
      post :clear, {}, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  context 'not logged in' do
    it 'renders blank' do
      post :clear, {}, {}
      expect(response.body).to be_blank
    end
  end
end
