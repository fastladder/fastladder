Konacha.configure do |config|
  require 'capybara/poltergeist'
  config.spec_dir = "spec/javascripts"
  config.driver   = :poltergeist

  Capybara.server = :puma
end if defined?(Konacha)

