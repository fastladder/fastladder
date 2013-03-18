Konacha.configure do |config|
  require 'capybara/poltergeist'
  config.spec_dir = "spec/javascripts"
  config.driver   = :poltergeist
end if defined?(Konacha)

