# -*- coding: utf-8 -*-
# Read about factories at https://github.com/thoughtbot/factory_bot

FactoryBot.define do
  sequence(:item_link_seq) {|n| "http://la.ma.la/blog/diary_200810292006.htm?n=#{n}" }
  sequence(:item_guid_seq) {|n| "guid#{n}" }

  factory :item do
    link { FactoryBot.generate(:item_link_seq) }
    title '最速インターフェース研究会 :: 近況'
    body '観光目的で7ヶ月ほど京都旅行に行っていた。<br>祇園祭楽しかったですね。'
    author 'mala'
    category '???'
    enclosure nil
    enclosure_type nil
    digest nil
    version 1
    guid { FactoryBot.generate(:item_guid_seq) }
    stored_on   { Time.now }
    modified_on { Time.now }
    created_on  { Time.now }
    updated_on  { Time.now }
  end

  factory :item_without_title, parent: :item do
    title nil
  end

  factory :item_without_guid, parent: :item do
    guid nil
  end

  factory :item_has_fixed_guid, parent: :item do
    guid "guid"
  end
end
