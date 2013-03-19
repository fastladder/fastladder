source 'https://rubygems.org'

gem 'rails', '3.2.12'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

gem 'sqlite3'
gem 'mysql2'
gem 'haml'
# current release version has no `feed.description` method. this is why :git used
gem 'feedzirra', :git => "https://github.com/pauldix/feedzirra"
gem 'opml', github: 'fastladder/opml'
gem 'verification', github: 'sikachu/verification'
gem 'feed_searcher', '>= 0.0.4'
gem 'nokogiri'
gem "mini_magick"
gem "addressable", :require => "addressable/uri"
gem "settingslogic"

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  gem 'i18n-js'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer', :platforms => :ruby

  gem 'uglifier', '>= 1.0.3'
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
end

group :test do
  gem 'webmock'
end

group :test, :development do
  gem 'konacha'
  gem 'poltergeist'
end


# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'debugger'
