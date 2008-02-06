@echo Creating database...don't close this window.
@echo Please run "start -> programs -> Fastladder -> Upgrade Database" if you have
@echo aborted.
ruby-win32\bin\rake db:migrate RAILS_ENV=production
