require File.dirname(__FILE__) + '/../test_helper'
require 'reader_controller'

# Re-raise errors caught by the controller.
class ReaderController; def rescue_action(e) raise e end; end

class ReaderControllerTest < Test::Unit::TestCase
  def setup
    @controller = ReaderController.new
    @request    = ActionController::TestRequest.new
    @response   = ActionController::TestResponse.new
  end

  # Replace this with your real tests.
  def test_truth
    assert true
  end
end
