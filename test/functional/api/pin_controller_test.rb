require File.dirname(__FILE__) + '/../../test_helper'
require 'api/pin_controller'

# Re-raise errors caught by the controller.
class Api::PinController; def rescue_action(e) raise e end; end

class Api::PinControllerTest < Test::Unit::TestCase
  def setup
    @controller = Api::PinController.new
    @request    = ActionController::TestRequest.new
    @response   = ActionController::TestResponse.new
  end

  # Replace this with your real tests.
  def test_truth
    assert true
  end
end
