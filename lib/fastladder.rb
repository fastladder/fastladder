require 'uri'
require 'openssl'
require 'open-uri'
require 'net/http'
require 'singleton'

module Fastladder
  Version = '0.0.3'
  HTTP_ACCEPT = 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5'

  module ClassMethods
    attr_reader :http_proxy, :http_proxy_except_hosts, :http_open_timeout, :http_read_timeout, :crawler_user_agent

    def configure(&block)
      @http_proxy ||= nil
      @http_proxy_except_hosts ||= []
      @http_open_timeout ||= 60
      @http_read_timeout ||= 60
      @crawler_user_agent ||= "Fastladder FeedFetcher/#{Fastladder::Version} (http://fastladder.org/)"
      block.call(self)
    end

    def proxy=(uri = nil)
      return if uri.blank?
      case uri
      when URI
        @http_proxy = uri
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
        @http_proxy = klass.build(uri)
      else
        begin
          uri = URI.parse(uri)
          uri = nil unless uri.kind_of?(URI::HTTP)
        rescue URI::InvalidURIError
          uri = nil
        end
        @http_proxy = uri
      end
    end

    def proxy_except_hosts=(patterns)
      patterns.reject! { |p| !p.kind_of?(Regexp) }
      @http_proxy_except_hosts = patterns
    end

    def open_timeout=(seconds); @http_open_timeout = seconds; end
    def read_timeout=(seconds); @http_read_timeout = seconds; end
    def crawler_user_agent=(name); @crawler_user_agent = name; end
  end
  extend ClassMethods

  def fetch(link, options = {})
    uri = link.kind_of?(URI) ? link : URI.parse(link)

    http_class = Net::HTTP
    # if proxy = uri.find_proxy || Fastladder.http_proxy
    #   unless Fastladder.http_proxy_except_hosts.any? { |pettern| uri.host =~ pettern }
    #     http_class = Net::HTTP.Proxy(proxy.host, proxy.port, proxy.user, proxy.password)
    #   end
    # end
    http = http_class.new(uri.host, uri.port)
    http.open_timeout = options[:open_timeout] || Fastladder.http_open_timeout
    http.read_timeout = options[:read_timeout] || Fastladder.http_read_timeout
    case uri.scheme
    when "http"
      # nothing to do
    when "https"
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_PEER
    else
      raise "unknown scheme: #{link.to_s}"
    end

    req = Net::HTTP::Get.new(uri.request_uri)
    req["Accept"] = Fastladder::HTTP_ACCEPT
    req["User-Agent"] = options[:user_agent] || Fastladder.crawler_user_agent
    req['If-Modified-Since'] = options[:modified_on] if options[:modified_on]
    req.basic_auth(options[:user] || uri.user, options[:password] || user.password) if options[:user] or uri.user

    http.start
    res = http.request(req)
    http.finish

    res
  end

  def simple_fetch(link, options = {})
    open(link.to_s,  "User-Agent" => "Fastladder (https://github.com/fastladder/fastladder)").read
  rescue Exception => e
    Rails.logger.error(e)
    Rails.logger.error(e.backtrace)
    nil
  end

  module_function :fetch, :simple_fetch
end
