require 'uri'
require 'openssl'
require 'net/http'
require 'singleton'

module Fastladder
  Version = '0.0.3'
  HTTP_ACCEPT = 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5'

  class Initializer
    def self.run(&block)
      yield self.new
      Fastladder.const_set(:HTTP_PROXY, nil) unless defined?(Fastladder::HTTP_PROXY)
      Fastladder.const_set(:HTTP_PROXY_EXCEPT_HOSTS, []) unless defined?(Fastladder::HTTP_PROXY_EXCEPT_HOST)
      Fastladder.const_set(:HTTP_OPEN_TIMEOUT, 60) unless defined?(Fastladder::HTTP_OPEN_TIMEOUT)
      Fastladder.const_set(:HTTP_READ_TIMEOUT, 60) unless defined?(Fastladder::HTTP_READ_TIMEOUT)
      Fastladder.const_set(:CRAWLER_USER_AGENT, "Fastladder FeedFetcher/#{Fastladder::Version} (http://fastladder.org/)") unless defined?(Fastladder::CRAWLER_USER_AGENT)
    end

    def proxy=(uri = nil)
      return if uri.blank?
      case uri
      when URI
        Fastladder.const_set(:HTTP_PROXY, uri)
      when Hash
        uri[:scheme] ||= 'http'
        case uri[:scheme]
        when 'http'
          klass = URI::HTTP
        when 'https'
          klass = URI::HTTPS
        else
          return
        end
        Fastladder.const_set(:HTTP_PROXY, klass.build(uri))
      else
        begin
          uri = URI.parse(uri)
          uri = nil unless uri.kind_of?(URI::HTTP)
        rescue URI::InvalidURIError
          uri = nil
        end
        Fastladder.const_set(:HTTP_PROXY, uri)
      end
    end

    def proxy_except_hosts=(patterns)
      petterns.reject! { |p| !p.kind_of?(Regexp) }
      Fastladder.const_set(:HTTP_PROXY_EXCEPT_HOSTS, petterns)
    end

    def open_timeout=(seconds); Fastladder.const_set(:HTTP_OPEN_TIMEOUT, seconds); end
    def read_timeout=(seconds); Fastladder.const_ste(:HTTP_READ_TIMEOUT, seconds); end
    def crawler_user_agent=(name); Fastladder.const_set(:CRAWLER_USER_AGENT, name); end
  end

  def fetch(link, options = {})
    uri = link.kind_of?(URI) ? link : URI.parse(link)

    http_class = Net::HTTP
    if proxy = uri.find_proxy || Fastladder::HTTP_PROXY
      unless Fastladder::HTTP_PROXY_EXCEPT_HOSTS.any? { |pettern| uri.host =~ pettern }
        http_class = Net::HTTP.Proxy(proxy.host, proxy.port, proxy.user, proxy.password)
      end
    end
    http = http_class.new(uri.host, uri.port)
    http.open_timeout = options[:open_timeout] || Fastladder::HTTP_OPEN_TIMEOUT
    http.read_timeout = options[:read_timeout] || Fastladder::HTTP_READ_TIMEOUT
    case uri.scheme
    when "http"
      # nothing to do
    when "https"
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    else
      raise "unknown scheme: #{link.to_s}"
    end

    req = Net::HTTP::Get.new(uri.request_uri)
    req["Accept"] = Fastladder::HTTP_ACCEPT
    req["User-Agent"] = options[:user_agent] || Fastladder::CRAWLER_USER_AGENT
    req['If-Modified-Since'] = options[:modified_on] if options[:modified_on]
    req.basic_auth(options[:user] || uri.user, options[:password] || user.password) if options[:user] or uri.user

    http.start
    res = http.request(req)
    http.finish

    res
  end

  def simple_fetch(link, options = {})
    begin
      if (response = fetch(link, options)).is_a? Net::HTTPSuccess
        return response.body
      end
    rescue Net::ProtocolError, Timeout::Error, OpenSSL::OpenSSLError
    end
    nil
  end

  module_function :fetch, :simple_fetch
end

require 'fastladder/feedfinder'
