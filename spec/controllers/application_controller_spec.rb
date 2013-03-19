require 'spec_helper'

describe ApplicationController do
  let(:member) { FactoryGirl.create(:member, password: 'mala', password_confirmation: 'mala') }

  describe '#login_required' do
    controller do
      before_filter :login_required

      def index
        render nothing: true
      end
    end

    context 'Member exists' do
      it 'renders 200' do
        get :index, { }, { member_id: member.id }
        expect(response).to be_success
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
      before_filter :current_member

      def index
        render nothing: true
      end
    end

    context 'Member exists' do
      it 'assigns @member' do
        get :index, { }, { member_id: member.id }
        expect(assigns(:member)).to be_true
      end
    end

    context 'Member not exists' do
      it 'not assigns @member' do
        get :index, { }, { }
        expect(assigns(:member)).to be_false
      end
    end
  end

  describe '.url_from_path' do
    it 'should extract URL from request-path' do
      request = double(:request)
      request.stub(:original_fullpath) { '/url/http://example.com' }
      controller.stub(:request) { request }

      controller.should_receive(:url_for).with(url: '.', only_path: true) { '/url/.' }

      controller.url_from_path(:url).should == 'http://example.com'
    end
  end
end
