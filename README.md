# Fastladder [![Build Status](https://travis-ci.org/fastladder/fastladder.png?branch=master)](https://travis-ci.org/fastladder/fastladder)

Fastladder (http://fastladder.com/) is the best solution for feed-hungry people who want to consume more RSS/Atom feeds, and this is its open-source version.
The open-source Fastladder, so called OpenFL, is an RSS reader to be installed on your PC or server with a capability to handle RSS feeds available within your Intranet.

## Setup

```
$ git clone git://github.com/fastladder/fastladder.git
$ cd fastladder
$ bundle install
$ bundle exec rake db:create db:migrate
$ bundle exec rake setup # Setup files for development
```
