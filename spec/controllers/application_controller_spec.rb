require 'spec_helper'

describe ApplicationController do
  describe '#login' do
    controller do
      before_filter :login

      def index
        render nothing: true
      end
    end

    let(:member) { FactoryGirl.create(:member, password: 'mala', password_confirmation: 'mala') }

    context 'Member exists' do
      it 'renders 200' do
        get :index, { }, { member_id: member.id }
        expect(response).to be_success
      end

      it 'assigns @member' do
        get :index, { }, { member_id: member.id }
        expect(assigns(:member)).to be
      end
    end

    context 'Member not exists' do
      it 'redirects to login_path' do
        get :index, { }, { }
        expect(response).to redirect_to(login_path)
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
