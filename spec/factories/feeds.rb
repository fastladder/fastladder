# -*- coding: utf-8 -*-
# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :feed do
    feedlink 'http://feeds.feedburner.com/mala/blog'
    link 'http://la.ma.la/blog/'
    title '最速インターフェース研究会'
    description 'はてな使ったら負けかなと思っている'
  end
end
