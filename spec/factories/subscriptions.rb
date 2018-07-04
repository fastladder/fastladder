# Read about factories at https://github.com/thoughtbot/factory_bot

FactoryBot.define do
  factory :subscription do
    feed { FactoryBot.create(:feed) }
  end

  factory :unread_subscription, parent: :subscription do
    feed { FactoryBot.create(:feed, items: [FactoryBot.create(:item, stored_on: 1.hour.ago)]) }
    has_unread true
    viewed_on { 2.hour.ago }
  end
end
