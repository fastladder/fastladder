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

  test "simple_fetch does not request a private address" do
    assert_nil Fastladder.simple_fetch("http://127.0.0.1/feed.xml")
    assert_not_requested :get, "http://127.0.0.1/feed.xml"
  end

  test "simple_fetch does not follow a redirect to a private address" do
    stub_request(:get, "http://example.com")
      .to_return(status: 302, headers: { "Location" => "http://169.254.169.254/latest/meta-data/" })

    assert_nil Fastladder.simple_fetch("http://example.com")
    assert_not_requested :get, "http://169.254.169.254/latest/meta-data/"
  end

  test "simple_fetch does not follow a redirect downgrading https to http" do
    stub_request(:get, "https://example.com")
      .to_return(status: 302, headers: { "Location" => "http://example.com" })

    assert_nil Fastladder.simple_fetch("https://example.com")
    assert_not_requested :get, "http://example.com"
  end

  test "fetch raises for a private address" do
    assert_raises Fastladder::UrlValidator::UnsafeUrlError do
      Fastladder.fetch("http://169.254.169.254/latest/meta-data/")
    end
  end
end
