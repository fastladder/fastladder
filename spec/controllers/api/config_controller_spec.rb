# -*- coding: utf-8 -*-
require 'spec_helper'

describe Api::ConfigController do
  let(:member) do
    FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala', config_dump: { 'use_wait' => '0' })
  end

  context 'logged in' do
    describe '.getter' do
      it 'renders json' do
        get :getter, {}, { member_id: member.id }
        expect(ActiveSupport::JSON.decode(response.body)).to include('use_wait' => '0', 'save_pin_limit' => Settings.save_pin_limit)
      end
    end

    describe '.setter' do
      it 'upadtes member' do
        expect {
          post :setter, { use_wait: 42 }, { member_id: member.id }
        }.to change {
          Member.where(id: member.id).first.config_dump['use_wait'].to_i
        }.from(0).to(42)
      end

      it 'renders json' do
        post :setter, { use_wait: 42 }, { member_id: member.id }
        expect(ActiveSupport::JSON.decode(response.body)).to include('use_wait' => '42')
      end
    end
  end

  context 'not logged in' do
    describe '.getter' do
      it 'renders empty' do
        get :getter, {}, {}
        expect(response.body).to be_blank
      end
    end

    describe '.setter' do
      it 'renders empty' do
        post :setter, { use_wait: 42 }, {}
        expect(response.body).to be_blank
      end

      it 'does not change value' do
        expect {
          post :setter, { use_wait: 42 }, {}
        }.to_not change {
          Member.where(id: member.id).first.config_dump['use_wait']
        }
      end
    end
  end

  context 'not logged in' do
    describe '.getter' do
      it 'renders empty' do
        get :getter, {}, {}
        expect(response.body).to be_blank
      end
    end

    describe '.setter' do
      it 'renders empty' do
        post :setter, { use_wait: 42 }, {}
        expect(response.body).to be_blank
      end

      it 'does not change value' do
        expect {
          post :setter, { use_wait: 42 }, {}
        }.to_not change {
          Member.where(id: member.id).first.config_dump['use_wait'].to_i
        }
      end
    end
  end
end
