# frozen_string_literal: true

require "test_helper"

# Chrome 158 rejects the "*" origin that Capybara 3.40.0 passes to
# Storage.clearDataForOrigin in ChromeDriver#reset!
# (https://github.com/teamcapybara/capybara/issues/2865).
if Gem.loaded_specs.fetch("capybara").version == Gem::Version.new("3.40.0")
  module ClearStorageWithoutWildcardOrigin
    private

    def execute_cdp(cmd, params = {})
      return super unless cmd == "Storage.clearDataForOrigin" && params[:origin] == "*"

      types = params[:storageTypes].to_s.split(",")
      super("Network.clearBrowserCookies") if types.delete("cookies")

      origin = Capybara.current_session.server&.base_url
      super(cmd, params.merge(origin: origin, storageTypes: types.join(","))) if origin && types.any?
    end
  end
  Capybara::Selenium::Driver::ChromeDriver.prepend(ClearStorageWithoutWildcardOrigin)
end

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :headless_chrome do |options|
    options.add_argument("--no-sandbox")
  end
end
