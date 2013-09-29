# -*- coding: utf-8 -*-
# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  sequence(:feed_feedlink_seq) {|n| "http://feeds.feedburner.com/mala/blog/?#{n}" }

  factory :feed do
    feedlink { FactoryGirl.generate(:feed_feedlink_seq) }
    link 'http://la.ma.la/blog/'
    title '最速インターフェース研究会'
    description 'はてな使ったら負けかなと思っている'
  end

  factory :crawl_ok_feed, parent: :feed do
    crawl_status { FactoryGirl.create(:crawl_status, status: Fastladder::Crawler::CRAWL_OK) }
    subscribers_count 1
  end

  factory :feed_without_description, parent: :feed do
    description nil
  end
end
