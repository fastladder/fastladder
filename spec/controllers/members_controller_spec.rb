require 'spec_helper'

describe MembersController do

  let :valid_params do
    {
      member: {
        username: 'bulkneets',
        password: 'mala',
        password_confirmation: 'mala',
      }
    }
  end

  let :valid_sessions do
    { }
  end

  describe 'GET /new' do
    it 'renders the new template' do
      get :new
      expect(response).to be_success
      expect(response).to render_template('new')
    end
  end

  describe 'POST /create'do
    it 'creates new member' do
      expect {
        post :create, valid_params, valid_sessions
      }.to change {
        Member.count
      }.by(1)
    end

    it 'redirects to /' do
      post :create, valid_params, valid_sessions
      expect(response).to redirect_to('/')
    end
  end
end
