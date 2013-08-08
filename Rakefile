# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Fastladder::Application.load_tasks

desc 'Setup files for development'
task 'setup' do
  %x{echo "Fastladder::Application.config.secret_token = '`bundle exec rake secret`'" > config/initializers/secret_token.rb}
end
