# -*- coding: utf-8 -*-
require 'spec_helper'

describe Api::PinController do
  before do
    @member = FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala')
  end

  let(:error) do
    { 'isSuccess' => false, 'ErrorCode' => 1 }.to_json
  end

  describe 'POST /all' do
    it 'renders json' do
      3.times.each { FactoryBot.create(:pin, member: @member) }
      post :all, {}, { member_id: @member.id }
      expect(response.body).to be_json
    end

    it 'renders purified link' do
      FactoryBot.create(:pin, member: @member, link: 'http://www.example.com/get?x=1&y=2')
      post :all, {}, { member_id: @member.id }
      expect(JSON.parse(response.body).last['link']).to include('&amp;')
    end
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
    context "pin not found" do
      it 'return errorcode' do
        post :remove, { link: 'http://la.ma.la/blog/diary_200810292006.htm' }, { member_id: @member.id }
        expect(JSON.parse(response.body)).to include("ErrorCode" => Api::PinController::ErrorCode::NOT_FOUND)
      end
    end
    context "pin exists" do
      let(:link) { 'http://la.ma.la/blog/diary_200810292006.htm' }
      before { FactoryBot.create(:pin, member: @member, link: link) }
      it 'return success' do
        post :remove, { link: link }, { member_id: @member.id }
        expect(JSON.parse(response.body)).to include("isSuccess" => true)
      end
    end
  end

  describe 'POST /clear' do
    before { FactoryBot.create(:pin, member: @member) }
    it 'renders json' do
      post :clear, {}, { member_id: @member.id }
      expect(response.body).to be_json
    end
    it 'delete all pins' do
      expect {
        post :clear, {}, { member_id: @member.id }
      }.to change{ @member.pins.count }.from(1).to(0)
    end
  end

  context 'not logged in' do
    it 'renders blank' do
      post :clear, {}, {}
      expect(response.body).to be_blank
    end
  end
end
