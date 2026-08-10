require "test_helper"

class Fastladder::UrlValidatorTest < ActiveSupport::TestCase
  test "allows a public http url" do
    assert Fastladder::UrlValidator.safe?("http://example.com/feed.xml")
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
    refute Fastladder::UrlValidator.safe_redirect?("https://example.com/", "http://example.com/")
    assert Fastladder::UrlValidator.safe_redirect?("http://example.com/", "https://example.com/")
    assert Fastladder::UrlValidator.safe_redirect?("https://example.com/", "https://example.org/")
  end

  test "safe_redirect? rejects an unsafe destination" do
    refute Fastladder::UrlValidator.safe_redirect?("http://example.com/", "http://127.0.0.1/")
  end
end
