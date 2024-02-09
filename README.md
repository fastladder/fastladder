# Fastladder

Fastladder (http://fastladder.com/) is the best solution for feed-hungry people who want to consume more RSS/Atom feeds, and this is its open-source version.
The open-source Fastladder, so called OpenFL, is an RSS reader to be installed on your PC or server with a capability to handle RSS feeds available within your Intranet.

## Setup and Run with Docker
```
git clone git://github.com/fastladder/fastladder.git
cd fastladder
docker-compose up
```

## Setup

```
$ git clone git://github.com/fastladder/fastladder.git
$ cd fastladder

# For SQLite
$ cp config/database.yml.sqlite3 config/database.yml
$ bundle install

# For MySQL
$ cp config/database.yml.mysql config/database.yml
$ bundle install

# For PostgreSQL
$ cp config/database.yml.postgresql config/database.yml
$ bundle install

$ bundle exec rake db:create db:migrate
$ bundle exec rake setup # Setup files for development
```

## Run

Run fastladder web process

```
$ bundle exec rails server
```

Run fastladder crawler process

```
$ bundle exec ruby script/crawler
```

You can run web and crawler processes by [foreman](https://github.com/ddollar/foreman).

```
$ foreman start         # run web and crawler processes
$ foreman start web     # run web process
$ foreman start crawler # run crawler process
```
