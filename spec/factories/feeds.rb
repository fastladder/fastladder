# -*- coding: utf-8 -*-
# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  sequence(:feed_feedlink_seq) {|n| "http://feeds.feedburner.com/mala/blog/#{n}" }

  factory :feed do
    feedlink { FactoryGirl.generate(:feed_feedlink_seq) }
    link 'http://la.ma.la/blog/'
    title '最速インターフェース研究会'
    description 'はてな使ったら負けかなと思っている'
  end
end
