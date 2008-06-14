# Be sure to restart your server when you modify this file

# Uncomment below to force Rails into production mode when
# you don't control web/app server and can't set it the proper way
# ENV['RAILS_ENV'] ||= 'production'

# Specifies gem version of Rails to use when vendor/rails is not present
RAILS_GEM_VERSION = '2.0.2' unless defined? RAILS_GEM_VERSION

# Bootstrap the Rails environment, frameworks, and default configuration
require File.join(File.dirname(__FILE__), 'boot')

Rails::Initializer.run do |config|
  # Settings in config/environments/* take precedence over those specified here.
  # Application configuration should go into files in config/initializers
  # -- all .rb files in that directory are automatically loaded.
  # See Rails::Configuration for more options.

  # Skip frameworks you're not going to use (only works if using vendor/rails).
  # To use Rails without a database, you must remove the Active Record framework
  # config.frameworks -= [ :active_record, :active_resource, :action_mailer ]

  # Only load the plugins named here, in the order given. By default, all plugins 
  # in vendor/plugins are loaded in alphabetical order.
  # :all can be used as a placeholder for all plugins not explicitly named
  # config.plugins = [ :exception_notification, :ssl_requirement, :all ]

  # Add additional load paths for your own custom dirs
  # config.load_paths += %W( #{RAILS_ROOT}/extras )

  # Force all environments to use the same logger level
  # (by default production uses :info, the others :debug)
  # config.log_level = :debug

  # Your secret key for verifying cookie session data integrity.
  # If you change this key, all old sessions will become invalid!
  # Make sure the secret is at least 30 characters and all random, 
  # no regular words or you'll be exposed to dictionary attacks.
  secret = ""
  secret_path = File.join(RAILS_ROOT, "config/secret.txt")
  if File.exist?(secret_path)
    secret = open(secret_path) { |io| io.read }.gsub(/\s/, '')
  end
  if secret.empty?
    characters = ("0".."9").to_a + ("a".."f").to_a
    secret = Array.new(128) { characters[rand(characters.size)] }.join
    open(secret_path, "w") { |io| io.write(secret) }
  end
  config.action_controller.session = {
    :session_key => '_fastladder_session',
    :secret      => secret
  }

  # Use the database for sessions instead of the cookie-based default,
  # which shouldn't be used to store highly confidential information
  # (create the session table with 'rake db:sessions:create')
  # config.action_controller.session_store = :active_record_store

  # Use SQL instead of Active Record's schema dumper when creating the test database.
  # This is necessary if your schema can't be completely dumped by the schema dumper,
  # like if you have constraints or database-specific column types
  # config.active_record.schema_format = :sql

  # Activate observers that should always be running
  # config.active_record.observers = :cacher, :garbage_collector

  # Make Active Record use UTC-base instead of local time
  # config.active_record.default_timezone = :utc
end

require 'fastladder'

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

require 'gettext/rails'
