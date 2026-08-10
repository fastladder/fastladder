# Fastladder

Fastladder (https://ja.wikipedia.org/wiki/Fastladder) is the best solution for feed-hungry people who want to consume more RSS/Atom feeds, and this is its open-source version.
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

## Configuration

### `ALLOW_INTRANET_FEEDS`

Fastladder fetches every feed URL its users ask for, so by default it refuses to
request URLs that resolve to a private, loopback, link-local or otherwise
non-globally-routable address. This keeps a user from pointing fastladder at
hosts that are only reachable from the machine it runs on, such as a cloud
metadata endpoint or an internal admin panel.

Set `ALLOW_INTRANET_FEEDS` to a truthy value (`1`, `true`, `yes` or `on`,
case-insensitive) to lift that restriction and let fastladder subscribe to feeds
served inside your own network:

```
$ ALLOW_INTRANET_FEEDS=1 bundle exec rails server
$ ALLOW_INTRANET_FEEDS=1 bundle exec ruby script/crawler
```

The default is off. Turn it on only when your installation is limited to trusted
users, because any of them can then make fastladder issue requests to any host
your server can reach. Only `http` and `https` URLs are accepted either way.
Set it for both the web and the crawler process, since each of them fetches
feeds on its own.
