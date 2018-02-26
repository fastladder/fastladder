# -*- coding: utf-8 -*-
# Read about factories at https://github.com/thoughtbot/factory_bot

FactoryBot.define do
  sequence(:pin_link_seq) {|n| "http://la.ma.la/blog/diary_200810292006.htm?n=#{n}" }

  factory :pin do
    link { generate :pin_link_seq }
    title 'title'
  end
end
