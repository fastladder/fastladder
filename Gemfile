source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.1.6'

# Include database gems for the adapters found in the database
# configuration file or DATABASE_URL
require 'erb'
require 'uri'
require 'yaml'

database_file = File.join(File.dirname(__FILE__), "config/database.yml")
adapters = []

if File.exist?(database_file)
  database_config = YAML::load(ERB.new(IO.read(database_file)).result)
  adapters += database_config.values.map {|conf| conf['adapter']}.compact.uniq
end

if database_url = ENV['DATABASE_URL']
  adapters << URI.parse(database_url).scheme
end

if adapters.any?
  adapters.each do |adapter|
    case adapter
    when 'mysql2'     ; gem 'mysql2'
    when 'mysql'      ; gem 'mysql'
    when /postgres/   ; gem 'pg'
    when /sqlite3/    ; gem 'sqlite3'
    else
      warn("Unknown database adapter `#{adapter}` found in config/database.yml, use Gemfile.local to load your own database gems")
    end
  end
else
  warn("No adapter found in config/database.yml or DATABASE_URL, please configure it first -- fallback to pg")
  gem 'pg'
end

group :production do
  gem 'unicorn'
  gem 'rails_12factor'
end

gem 'haml'

# current release version has no `feed.description` method. this is why :git used
gem 'feedjira'
gem 'opml', github: 'fastladder/opml'
gem 'feed_searcher', '>= 0.0.6'
gem 'nokogiri'
gem "mini_magick"
gem "addressable", require: "addressable/uri"
gem "settingslogic"

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.0'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

gem 'i18n-js', github: 'fnando/i18n-js'

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

group :development do
  gem 'pry-rails'
  gem 'pry-doc'
  gem 'annotate'
  gem 'quiet_assets'
end

group :development, :test do
  gem 'rspec-rails'
  gem 'rspec-activemodel-mocks'
  gem 'capybara'
  gem 'launchy'
  gem 'factory_girl_rails'
  gem 'simplecov'
  gem 'simplecov-rcov'
  gem 'coveralls', require: false
end

group :test do
  gem 'webmock'
end

group :test, :development do
  gem 'konacha'
  gem 'poltergeist'
  gem 'sinon-rails'
  gem 'thin'
  gem 'eventmachine', github: 'eventmachine/eventmachine', ref: '4d53154a9e' # v1.0.3 cannot compile on ruby 2.2.0
end
