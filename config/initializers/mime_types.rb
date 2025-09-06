# Be sure to restart your server when you modify this file.

# Add new mime types for use in respond_to blocks:
# Mime::Type.register "text/richtext", :rtf

# Register RSS and OPML MIME types (required in Rails 8.1+)
Mime::Type.register "application/rss+xml", :rss unless Mime::Type.lookup_by_extension(:rss)
Mime::Type.register "text/x-opml", :opml unless Mime::Type.lookup_by_extension(:opml)
