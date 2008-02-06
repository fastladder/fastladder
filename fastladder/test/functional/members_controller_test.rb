require File.dirname(__FILE__) + '/../test_helper'
require 'members_controller'

# Re-raise errors caught by the controller.
class MembersController; def rescue_action(e) raise e end; end

class MembersControllerTest < Test::Unit::TestCase
  # Be sure to include AuthenticatedTestHelper in test/test_helper.rb instead
  # Then, you can remove it from this and the units test.
  include AuthenticatedTestHelper

  fixtures :members

  def setup
    @controller = MembersController.new
    @request    = ActionController::TestRequest.new
    @response   = ActionController::TestResponse.new
  end

  def test_should_allow_signup
    assert_difference 'Member.count' do
      create_member
      assert_response :redirect
    end
  end

  def test_should_require_login_on_signup
    assert_no_difference 'Member.count' do
      create_member(:login => nil)
      assert assigns(:member).errors.on(:login)
      assert_response :success
    end
  end

  def test_should_require_password_on_signup
    assert_no_difference 'Member.count' do
      create_member(:password => nil)
      assert assigns(:member).errors.on(:password)
      assert_response :success
    end
  end

  def test_should_require_password_confirmation_on_signup
    assert_no_difference 'Member.count' do
      create_member(:password_confirmation => nil)
      assert assigns(:member).errors.on(:password_confirmation)
      assert_response :success
    end
  end

  def test_should_require_email_on_signup
    assert_no_difference 'Member.count' do
      create_member(:email => nil)
      assert assigns(:member).errors.on(:email)
      assert_response :success
    end
  end
  

  protected
    def create_member(options = {})
      post :create, :member => { :login => 'quire', :email => 'quire@example.com',
        :password => 'quire', :password_confirmation => 'quire' }.merge(options)
    end
end
