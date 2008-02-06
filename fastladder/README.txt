** INSTALL

0. If you want to use SQLite3, install libraries by apt-get(Debian)
# apt-get install libsqlite3-dev

1. Install modules by gem

# gem update
# gem install rails
# gem install rfeedfinder
# gem install feed-normalizer
# gem install opml
# gem install mongrel

SQLite3 users:
# gem install sqlite3-ruby

MySQL users:
# gem install mysql

2. Database

Copy config/database.yml.sqlite3 or config/database.yml.mysql which you like to config/database.yml, and edit config/database.yml.
$ rake db:migrate
$ script/server &
$ script/crawler &

** SETUP(WIN32)
1. Ruby
http://www.garbagecollect.jp/ruby/mswin32/en/download/release.html
Download ruby-1.8.6-p111-i386-mswin32.zip, and extract.
For example, I supporse the directory is "C:\ruby".

2. Get libraries
http://jarp.does.notwork.org/win32/ (openssl, zlib, readline)
http://www.sqlite.org/download.html (sqlite3)
http://freeimage.sourceforge.net/download.html (FreeImage)
Take libeay32.dll, ssleay32.dll, zlib.dll, readline.dll, sqlite3.dll, and FreeImage.dll from the archives. Put the DLLs to "bin\ruby" directory.
C:\ruby> copy *.dll bin\ruby

2. RubyGems
https://rubyforge.org/projects/rubygems/
Extract and execute setup.rb.
C:\ruby> bin\ruby rubygems-1.0.1\setup.rb

4. Install Rails
C:\ruby\bin> gem install rails
C:\ruby\bin> gem install mongrel_service
C:\ruby\bin> gem install rfeedfinder
C:\ruby\bin> gem install feed-normalizer
C:\ruby\bin> gem install opml
