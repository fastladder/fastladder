# frozen_string_literal: true

require "application_system_test_case"

class PinTest < ApplicationSystemTestCase
  setup do
    Member.create!(username: "dankogai", password: "kogaidan", password_confirmation: "kogaidan")
    visit "/login"
    fill_in "username", with: "dankogai"
    fill_in "password", with: "kogaidan"
    click_on "Sign In"
    assert_current_path "/reader/"
    assert_text "Loading completed.", wait: 10
  end

  test "a pin dropped over the limit can be pinned again" do
    pinned = page.evaluate_script(<<~JS)
      (function(){
        app.config.use_pinsaver = 0;
        app.config.save_pin_limit = 1;
        app.pin.add("http://example.com/a", "a");
        app.pin.add("http://example.com/b", "b");
        var dropped = app.pin.has("http://example.com/a");
        app.pin.add("http://example.com/a", "a");
        return { dropped: dropped, urls: app.pin.pins.map(function(p){ return p.url }) };
      })()
    JS

    assert_equal false, pinned["dropped"]
    assert_equal ["http://example.com/a"], pinned["urls"]
  end
end
