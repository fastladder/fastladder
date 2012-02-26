require File.dirname(__FILE__) + '/../test_helper'
require 'import_controller'

# Re-raise errors caught by the controller.
class ImportController; def rescue_action(e) raise e end; end

class ImportControllerTest < Test::Unit::TestCase
  def setup
    @controller = ImportController.new
    @request    = ActionController::TestRequest.new
    @response   = ActionController::TestResponse.new
  end

  # Replace this with your real tests.
  def test_truth
    assert true
  end
end
