# Feeds hosted on these domains (including their subdomains) always ignore
# body-only item updates, regardless of the per-feed ignore_body_update flag.
# Some providers (e.g. Ameba blogs) serve a slightly different item body on
# every fetch, which would otherwise mark already-read items as unread again
# on each crawl.
IGNORE_BODY_UPDATE_DOMAINS = %w(
  ameblo.jp
  ameba.jp
).freeze
