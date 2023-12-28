source 'https://rubygems.org'
gem 'rails', '5.0.7.2'

require 'erb'
require 'uri'
require 'yaml'

gem 'mysql2'
gem 'pg'
gem 'sqlite3', '< 1.4.0'

gem 'addressable', require: 'addressable/uri'
gem 'feed_searcher', '>= 0.0.6'
gem 'feedjira', '< 3.0.0'
gem 'haml'
gem 'i18n-js', '< 4.0'
gem 'jbuilder', '~> 2.0'
gem 'mini_magick'
gem 'nokogiri', '< 1.14.0'
gem 'opml', git: 'https://github.com/fastladder/opml'
gem 'settingslogic'
gem 'uglifier', '>= 1.3.0'

group :test do
  gem 'capybara'
  gem 'factory_bot_rails'
  gem 'rspec-activemodel-mocks'
  gem 'rspec-rails', '4.1.2'
  gem 'puma'
  gem 'webmock'
end

group :production do
  gem 'rails_12factor'
  gem 'unicorn'
end

gem "rails-controller-testing", "~> 1.0"
