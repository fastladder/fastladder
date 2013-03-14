# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Fastladder::Application.initialize!

require 'fastladder'
require 'string_utils'

MAX_UNREAD_COUNT = 10
DEFAULT_FAVICON = "#{Rails.root}/public/img/icon/default.png"
SUBSCRIBE_LIMIT = 5000
SAVE_PIN_LIMIT = 100
CRAWL_INTERVAL = 60

ALLOW_TAGS = %w(a i u b em strong table tr td th tbody font center div pre code blockquote ins del img br p hr ul li ol dl dt dd)
ALLOW_ATTRIBUTES = %w(src width height border alt title href color size align)



Fastladder::Initializer.run do |config|
  #config.proxy = {
  #  :scheme => 'http',
  #  :host => 'proxy.example.com',
  #  :port => 8080,
  #  :user => nil,
  #  :password => nil
  #}
  #config.proxy_except_hosts = [ /localhost/ ]
  #config.open_timeout = 60
  #config.read_timeout = 60
  #config.crawler_user_agent = "Fastladder FeedFetcher/#{Fastladder::Version} (http://fastladder.org/)"
end
