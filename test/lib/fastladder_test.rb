require "test_helper"

class FastladderTest < ActiveSupport::TestCase
  test "changes http_proxy_except_hosts" do
    Fastladder.proxy_except_hosts = [/foo/, :bar, "buz"]
    assert_equal [/foo/], Fastladder.http_proxy_except_hosts
  end

  test "changes http_open_timeout" do
    Fastladder.open_timeout = 100
    assert_equal 100, Fastladder.http_open_timeout
  end

  test "changes http_read_timeout" do
    Fastladder.read_timeout = 200
    assert_equal 200, Fastladder.http_read_timeout
  end

  test "changes crawler_user_agent" do
    Fastladder.crawler_user_agent = "YetAnother FeedFetcher/0.0.3 (http://example.com/)"
    assert_equal "YetAnother FeedFetcher/0.0.3 (http://example.com/)", Fastladder.crawler_user_agent
  end

  test "simple_fetch can handle http => https redirect" do
    stub_request(:get, "http://example.com")
      .to_return(status: 301, headers: { "Location" => "https://example.com" })

    stub_request(:get, "https://example.com")
      .to_return(status: 200, body: "Success")

    assert_equal "Success", Fastladder.simple_fetch("http://example.com")
  end
end
