require "erb"
# require "jcode"
require "uri"

class String
  SANITIZE_HELPER = Class.new { include ActionView::Helpers::SanitizeHelper }.new
  LAME_CHARS = [0x200c, 0x200d, 0x200e, 0x200f, 0x2028, 0x2029, 0x202a, 0x202b, 0x202c, 0x202d, 0x202e, 0x206a, 0x206b, 0x206c, 0x206d, 0x206e, 0x206f, 0xfeff].pack("U*")

  def utf8_roundtrip
    self.encode('UTF-8').delete(LAME_CHARS)
  end

  def sanitize_uri
    begin
      uri = URI.parse(self)
    rescue URI::Error => e
      return ""
    end
    case uri
    when URI::Generic, URI::HTTP, URI::HTTPS, URI::FTP, URI::MailTo
      return uri.normalize.to_s
    else
      return ""
    end
  end

  def html_escape
    ERB::Util.html_escape(self)
  end

  def purify_uri
    str = self.utf8_roundtrip
    str = str.sanitize_uri
    str.html_escape
  end

  def purify_html
    str = self.utf8_roundtrip
    str = SANITIZE_HELPER.strip_tags(str)
    str.html_escape
  end

  def scrub_html
    # str = self.delete([0xe280a8].pack("U*")).scrub
    str = self
    str = SANITIZE_HELPER.sanitize str, tags: Settings.allow_tags, attributes: Settings.allow_attributes
    # , attributes: %w(id class style)
    str
  end

  def html2text
    self.gsub(/<.*?>/, "").gsub(/\s/, "")
  end
end
