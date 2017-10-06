namespace :fastladder do
  desc 'Setup files for development'
  task :setup do
    File.write(Rails.root.join('config', 'secrets.yml'), <<-YAML.strip_heredoc)
    development:
      secret_key_base: #{SecureRandom.hex(64)}
    test:
      secret_key_base: #{SecureRandom.hex(64)}
    production:
      secret_key_base: <%= ENV['SECRET_KEY_BASE'] %>
    YAML
  end
end

desc 'Setup files for development'
task :setup do
  Rake::Task['fastladder:setup'].invoke
end