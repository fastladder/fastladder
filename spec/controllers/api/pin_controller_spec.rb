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

    context "when over limit pins added" do
      before {
        old_pins = Array.new(Settings.save_pin_limit) {|n| FactoryGirl.create(:pin, member: @member, link: "http://example.com/?#{n}") }
        @oldest_pin = old_pins[0]
      }
      it "older will collection" do
        post :add, { link: 'http://la.ma.la/blog/diary_200810292006.htm', title: '近況' }, { member_id: @member.id }
        expect { @oldest_pin.reload }.to raise_error ActiveRecord::RecordNotFound # be_destroyed
      end
    end
  end

  describe 'POST /remove' do
    it 'renders json' do
      post :remove, { link: 'http://la.ma.la/blog/diary_200810292006.htm' }, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end

  describe 'POST /clear' do
    it 'renders json' do
      post :clear, {}, { member_id: @member.id }
      expect(response.body).to be_json
    end
  end
end
