require "test_helper"

class Fastladder::UrlValidatorTest < ActiveSupport::TestCase
  PUBLIC_ADDRESS = "203.0.113.1".freeze

  test "allows a public http url" do
    with_public_dns do
      assert Fastladder::UrlValidator.safe?("http://example.com/feed.xml")
    end
  end

  test "rejects schemes other than http and https" do
    refute Fastladder::UrlValidator.safe?("file:///etc/passwd")
    refute Fastladder::UrlValidator.safe?("ftp://example.com/feed.xml")
    refute Fastladder::UrlValidator.safe?("/feed.xml")
  end

  test "rejects loopback addresses" do
    refute Fastladder::UrlValidator.safe?("http://127.0.0.1/")
    refute Fastladder::UrlValidator.safe?("http://[::1]/")
    refute Fastladder::UrlValidator.safe?("http://localhost/")
  end

  test "rejects private and link local addresses" do
    refute Fastladder::UrlValidator.safe?("http://10.0.0.1/")
    refute Fastladder::UrlValidator.safe?("http://172.16.0.1/")
    refute Fastladder::UrlValidator.safe?("http://192.168.0.1/")
    refute Fastladder::UrlValidator.safe?("http://169.254.169.254/latest/meta-data/")
  end

  test "rejects addresses written in an alternative notation" do
    refute Fastladder::UrlValidator.safe?("http://2130706433/")
    refute Fastladder::UrlValidator.safe?("http://0177.0.0.1/")
    refute Fastladder::UrlValidator.safe?("http://[::ffff:127.0.0.1]/")
  end

  test "rejects a host name resolving to a private address" do
    Fastladder::UrlValidator.stub :resolve, [IPAddr.new("127.0.0.1")] do
      refute Fastladder::UrlValidator.safe?("http://feed.example.com/")
    end
  end

  test "validate! raises for an unsafe url" do
    assert_raises Fastladder::UrlValidator::UnsafeUrlError do
      Fastladder::UrlValidator.validate!("http://169.254.169.254/")
    end
  end

  test "safe_redirect? rejects a downgrade from https to http" do
    with_public_dns do
      refute Fastladder::UrlValidator.safe_redirect?("https://example.com/", "http://example.com/")
      assert Fastladder::UrlValidator.safe_redirect?("http://example.com/", "https://example.com/")
      assert Fastladder::UrlValidator.safe_redirect?("https://example.com/", "https://example.org/")
    end
  end

  test "safe_redirect? rejects an unsafe destination" do
    refute Fastladder::UrlValidator.safe_redirect?("http://example.com/", "http://127.0.0.1/")
  end

  test "ALLOW_INTRANET_FEEDS is off unless it is set to a truthy value" do
    refute Fastladder::UrlValidator.intranet_feeds_allowed?

    %w(1 true TRUE yes on).each do |value|
      with_intranet_feeds(value) { assert Fastladder::UrlValidator.intranet_feeds_allowed?, value }
    end

    %w(0 false no off).each do |value|
      with_intranet_feeds(value) { refute Fastladder::UrlValidator.intranet_feeds_allowed?, value }
    end
  end

  test "allows private and loopback addresses when ALLOW_INTRANET_FEEDS is set" do
    with_intranet_feeds("1") do
      assert Fastladder::UrlValidator.safe?("http://127.0.0.1/")
      assert Fastladder::UrlValidator.safe?("http://[::1]/")
      assert Fastladder::UrlValidator.safe?("http://10.0.0.1/")
      assert Fastladder::UrlValidator.safe?("http://192.168.0.1/feed.xml")
      assert Fastladder::UrlValidator.safe?("http://169.254.169.254/")
      assert Fastladder::UrlValidator.safe?("http://#{PUBLIC_ADDRESS}/feed.xml")
    end
  end

  test "keeps rejecting other schemes when ALLOW_INTRANET_FEEDS is set" do
    with_intranet_feeds("1") do
      refute Fastladder::UrlValidator.safe?("file:///etc/passwd")
      refute Fastladder::UrlValidator.safe?("ftp://example.com/feed.xml")
    end
  end

  test "validate! accepts an intranet url when ALLOW_INTRANET_FEEDS is set" do
    with_intranet_feeds("yes") do
      assert_equal "http://192.168.0.1/feed.xml", Fastladder::UrlValidator.validate!("http://192.168.0.1/feed.xml")
    end
  end

  test "safe_redirect? follows a redirect to an intranet host when ALLOW_INTRANET_FEEDS is set" do
    with_intranet_feeds("true") do
      assert Fastladder::UrlValidator.safe_redirect?("http://example.com/", "http://192.168.0.1/feed.xml")
      refute Fastladder::UrlValidator.safe_redirect?("https://example.com/", "http://192.168.0.1/feed.xml")
    end
  end

  private

  # Host names are never looked up for real: the suite must not depend on the
  # resolver it happens to run with.
  def with_public_dns(&block)
    Fastladder::UrlValidator.stub :resolve, [IPAddr.new(PUBLIC_ADDRESS)], &block
  end

  def with_intranet_feeds(value)
    previous = ENV[Fastladder::UrlValidator::INTRANET_ENV_KEY]
    ENV[Fastladder::UrlValidator::INTRANET_ENV_KEY] = value
    yield
  ensure
    ENV[Fastladder::UrlValidator::INTRANET_ENV_KEY] = previous
  end
end
