source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.0'

# Use mysql as the database for Active Record
gem 'sqlite3'
gem 'mysql2'
gem 'haml'

# current release version has no `feed.description` method. this is why :git used
gem 'feedzirra', github: 'pauldix/feedzirra'
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
gem 'jbuilder', '~> 1.2'

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
end

# Use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]
