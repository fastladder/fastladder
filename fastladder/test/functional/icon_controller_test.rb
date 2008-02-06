require File.dirname(__FILE__) + '/../test_helper'
require 'icon_controller'

# Re-raise errors caught by the controller.
class IconController; def rescue_action(e) raise e end; end

class IconControllerTest < Test::Unit::TestCase
  def setup
    @controller = IconController.new
    @request    = ActionController::TestRequest.new
    @response   = ActionController::TestResponse.new
  end

  # Replace this with your real tests.
  def test_truth
    assert true
  end
end
