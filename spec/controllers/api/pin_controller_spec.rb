# -*- coding: utf-8 -*-
require 'spec_helper'

describe Api::PinController do
  before do
    @member = FactoryGirl.create(:member, password: 'mala', password_confirmation: 'mala')
  end

  describe 'POST /add' do
    it 'renders json' do
      post :add, { link: 'http://la.ma.la/blog/diary_200810292006.htm', title: '近況' }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  describe 'POST /remove' do
    it 'renders json' do
      post :remove, { link: 'http://la.ma.la/blog/diary_200810292006.htm' }, { member_id: @member.id }
      expect(response.body).to be_json
    end

    context "pin not found" do
      it 'return errorcode' do
        post :remove, { link: 'http://la.ma.la/blog/diary_200810292006.htm' }, { member_id: @member.id }
        expect(JSON.parse(response.body)).to include("ErrorCode" => Api::PinController::ErrorCode::NOT_FOUND)
      end
    end
    context "pin exists" do
      let(:link) { 'http://la.ma.la/blog/diary_200810292006.htm' }
      before { FactoryGirl.create(:pin, member: @member, link: link) }
      it 'return success' do
        post :remove, { link: link }, { member_id: @member.id }
        expect(JSON.parse(response.body)).to include("isSuccess" => true)
      end
    end
  end

  describe 'POST /clear' do
    before { FactoryGirl.create(:pin, member: @member) }
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
end
