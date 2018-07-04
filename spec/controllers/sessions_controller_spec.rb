require 'spec_helper'

describe SessionsController do
  let(:member) {
    FactoryBot.create(:member, password: 'mala', password_confirmation: 'mala')
  }

  let(:valid_sessions) {
    { member_id: member.id }
  }

  describe "GET 'new'" do
    context "when member doesn't exist" do
      it do
        get 'new'
        expect(response).to redirect_to sign_up_path
      end
    end

    context "when member exists" do
      before { member }

      it do
        get 'new'
        expect(response).to be_success
      end
    end
  end

  describe "POST 'create'" do
    context "when authenticate successfully" do
      it "should redirect to root path" do
        post :create, { username: member.username, password: member.password }
        expect(response).to redirect_to root_path
        expect(flash[:notice]).not_to be_nil
      end
    end

    context "when authenticate failed" do
      it "should re-render new page" do
        post :create, { username: "bogus_username", password: "bogus_password" }
        expect(response).to render_template("new")
        expect(flash[:alert]).not_to be_nil
      end
    end
  end

  describe "GET 'destroy'" do
    before {
      member
      session[:member_id] = Member.authenticate(member.username, member.password)
    }

    it "should remove session id" do
      expect {
        get 'destroy'
      }.to change {
        session[:member_id]
      }.from(member).to(nil)
    end

    it "should redirect to root path" do
      get 'destroy'
      expect(response).to redirect_to root_path
      expect(flash[:notice]).not_to be_nil
    end
  end
end
