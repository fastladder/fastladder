source 'https://rubygems.org'
gem 'rails', '5.0.7.2'

# Include database gems for the adapters found in the database
# configuration file or DATABASE_URL
require 'erb'
require 'uri'
require 'yaml'

gem 'mysql2'
gem 'pg'
gem 'sqlite3', '< 1.4.0'

gem 'addressable', require: 'addressable/uri'
gem 'coffee-rails', '~> 4.1.0'
gem 'feed_searcher', '>= 0.0.6'
gem 'feedjira', '< 3.0.0'
gem 'haml'
gem 'i18n-js'
gem 'jbuilder', '~> 2.0'
gem 'jquery-rails'
gem 'mini_magick'
gem 'nokogiri', '< 1.14.0'
gem 'opml', git: 'https://github.com/fastladder/opml'
gem 'sass-rails', '~> 5.0.0'
gem 'settingslogic'
gem 'uglifier', '>= 1.3.0'

group :development, :test do
  gem 'pry-byebug'
end

group :development do
  gem 'annotate'
  gem 'pry-rails'
  gem 'pry-doc'
end

group :test do
  gem 'capybara'
  gem 'coveralls', require: false
  gem 'factory_bot_rails'
  #gem 'konacha'
  gem 'launchy'
  #gem 'poltergeist'
  gem 'rspec-activemodel-mocks'
  gem 'rspec-rails', '4.1.2'
  gem 'simplecov'
  gem 'simplecov-rcov'
  gem 'sinon-rails'
  gem 'puma'
  gem 'webmock'
end

group :production do
  gem 'rails_12factor'
  gem 'unicorn'
end

gem "rails-controller-testing", "~> 1.0"
