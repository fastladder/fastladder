require "test_helper"

class SessionsControllerTest < ActionController::TestCase
  def setup
    @member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
  end

  test "GET new when no member exists redirects to sign up path" do
    Member.destroy_all
    get :new
    assert_redirected_to sign_up_path
  end

  test "GET new when member exists returns success" do
    get :new
    assert_response :success
  end

  test "POST create with valid credentials redirects to root path" do
    post :create, params: { username: @member.username, password: @member.password }
    assert_redirected_to root_path
    assert_not_nil flash[:notice]
  end

  test "POST create with invalid credentials re-renders new page" do
    post :create, params: { username: "bogus_username", password: "bogus_password" }
    assert_template "new"
    assert_not_nil flash[:alert]
  end

  test "GET destroy removes session id" do
    session[:member_id] = Member.authenticate(@member.username, @member.password)
    get :destroy
    assert_nil session[:member_id]
  end

  test "GET destroy redirects to root path" do
    session[:member_id] = Member.authenticate(@member.username, @member.password)
    get :destroy
    assert_redirected_to root_path
    assert_not_nil flash[:notice]
  end
end
