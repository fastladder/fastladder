# frozen_string_literal: true

require "test_helper"

WebMock.allow_net_connect!

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :headless_chrome do |options|
    options.add_argument("--no-sandbox")
  end
end
