require 'spec_helper'

describe ApplicationController do
  let(:member) { FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala') }

  describe '#login_required' do
    controller do
      before_action :login_required

      def index
        head 200
      end
    end

    context 'Member exists' do
      context 'session[:member_id] is given' do
        it 'renders 200' do
          get :index, { }, { member_id: member.id }
          expect(response).to be_success
        end
      end

      context 'params[:auth_key] is given' do
        before do
          member.set_auth_key
        end

        it 'renders 200' do
          get :index, { auth_key: member.auth_key }
          expect(response).to be_success
        end
      end
    end

    context 'Member not exists' do
      it 'redirects to login_path' do
        get :index, { }, { }
        expect(response).to redirect_to(login_path)
      end
    end
  end

  describe '#current_member' do
    controller do
      before_action :current_member

      def index
        head 200
      end
    end

    context 'Member exists' do
      it 'assigns @member' do
        get :index, { }, { member_id: member.id }
        expect(assigns(:member)).to_not be_nil
      end
    end

    context 'Member not exists' do
      it 'not assigns @member' do
        get :index, { }, { }
        expect(assigns(:member)).to be_nil
      end
    end
  end

  describe '.url_from_path' do
    it 'should extract URL from request-path' do
      request = double(:request)
      allow(request).to receive(:original_fullpath) { '/url/http://example.com' }
      allow(controller).to receive(:request) { request }

      expect(controller).to receive(:url_for).with(url: '.', only_path: true) { '/url/.' }

      expect(controller.url_from_path(:url)).to eq('http://example.com')
    end
  end
end
