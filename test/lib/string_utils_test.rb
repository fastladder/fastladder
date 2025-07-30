# -*- coding: utf-8 -*-

require "test_helper"

class StringUtilsTest < ActiveSupport::TestCase
  test "utf8_roundtrip utf-8 turns utf-8" do
    str = "Ruby1.8をつかっている人はもういない"
    assert_equal "Ruby1.8をつかっている人はもういない", str.utf8_roundtrip
  end

  test "utf8_roundtrip euc-jp turns utf-8" do
    str = "Ruby1.8をつかっている人はもういない".encode("EUC-JP")
    assert_equal "Ruby1.8をつかっている人はもういない", str.utf8_roundtrip
  end

  test "utf8_roundtrip Shift-JIS turns utf-8" do
    str = "Ruby1.8をつかっている人はもういない".encode("Shift_JIS")
    assert_equal "Ruby1.8をつかっている人はもういない", str.utf8_roundtrip
  end

  test "scrub_html strips danger element tag" do
    assert_equal "foo", "<script></script>foo".scrub_html
  end

  test "scrub_html strips danger element attribute" do
    assert_equal "<i>foo</i>", '<i style="">foo</i>'.scrub_html
  end

  test "scrub_html keeps safe element tag" do
    assert_equal "<br>", "<br/>".scrub_html
  end

  test "scrub_html keeps safe element attribute" do
    assert_equal '<img src="foo.png">', '<img src="foo.png">'.scrub_html
  end
end
