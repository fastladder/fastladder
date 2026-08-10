require "ipaddr"
require "socket"
require "uri"

module Fastladder
  # Feed URLs come from users, so every URL fastladder fetches has to be checked
  # before the request is made: only plain http(s) URLs resolving to a globally
  # routable address are allowed.
  module UrlValidator
    class UnsafeUrlError < StandardError; end

    ALLOWED_SCHEMES = %w(http https).freeze

    BLOCKED_RANGES = %w(
      0.0.0.0/8
      10.0.0.0/8
      100.64.0.0/10
      127.0.0.0/8
      169.254.0.0/16
      172.16.0.0/12
      192.0.0.0/24
      192.168.0.0/16
      198.18.0.0/15
      224.0.0.0/4
      240.0.0.0/4
      ::/128
      ::1/128
      64:ff9b::/96
      fc00::/7
      fe80::/10
      ff00::/8
    ).map { |range| IPAddr.new(range) }.freeze

    module_function

    def safe?(url)
      uri = URI.parse(url.to_s)
      return false unless ALLOWED_SCHEMES.include?(uri.scheme)
      return false if uri.host.blank?
      resolve(uri.host).none? { |address| blocked?(address) }
    rescue URI::InvalidURIError
      false
    end

    def validate!(url)
      raise UnsafeUrlError, "unsafe URL: #{url}" unless safe?(url)
      url
    end

    # A redirect must not downgrade https to http, and its destination has to be
    # safe on its own.
    def safe_redirect?(from, to)
      return false if URI.parse(from.to_s).scheme == "https" && URI.parse(to.to_s).scheme != "https"
      safe?(to)
    rescue URI::InvalidURIError
      false
    end

    # Names that do not resolve are left to the HTTP layer: it cannot connect to
    # them either.
    def resolve(host)
      host = host.delete_prefix("[").delete_suffix("]")
      Addrinfo.getaddrinfo(host, nil, nil, :STREAM).map { |info| IPAddr.new(info.ip_address) }
    rescue SocketError, IPAddr::InvalidAddressError
      []
    end

    def blocked?(address)
      address = address.native if address.ipv4_mapped?
      BLOCKED_RANGES.any? { |range| range.include?(address) }
    end
  end
end
