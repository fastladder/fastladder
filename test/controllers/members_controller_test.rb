require "test_helper"

class MembersControllerTest < ActionController::TestCase
  def setup
    @valid_params = {
      member: {
        username: "bulkneets",
        password: "mala",
        password_confirmation: "mala",
      },
    }
    @valid_sessions = {}
  end

  test "GET new renders the new template" do
    get :new
    assert_response :success
    assert_template "new"
  end

  test "POST create creates new member" do
    assert_difference "Member.count", 1 do
      post :create, params: @valid_params, session: @valid_sessions
    end
  end

  test "POST create redirects to /" do
    post :create, params: @valid_params, session: @valid_sessions
    assert_redirected_to "/"
  end
end
