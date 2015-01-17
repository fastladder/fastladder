# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

require 'fastladder'
require 'string_utils'

Mime::Type.register 'text/x-opml', :opml

Fastladder.configure do |config|
  # config.proxy = {
  #   scheme: 'http',
  #   host: 'proxy.example.com',
  #   port: 8080,
  #   user: nil,
  #   password: nil
  # }
  # config.proxy_except_hosts = [ /localhost/ ]
  # config.open_timeout = 60
  # config.read_timeout = 60
  # config.crawler_user_agent = "Fastladder FeedFetcher/#{Fastladder::Version} (http://fastladder.org/)"
end
