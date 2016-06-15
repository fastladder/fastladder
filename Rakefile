# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Fastladder::Application.load_tasks

desc 'Setup files for development'
task 'setup' do
  File.write("config/secrets.yml", <<-YAML.strip_heredoc)
    development:
      secret_key_base: #{`bundle exec rake secret`}
    test:
      secret_key_base: #{`bundle exec rake secret`}
    production:
      secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>
  YAML
end
