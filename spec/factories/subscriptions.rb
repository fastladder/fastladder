# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :subscription do
    feed { FactoryGirl.create(:feed) }
  end

  factory :unread_subscription, parent: :subscription do
    feed { FactoryGirl.create(:feed, items: [FactoryGirl.create(:item, stored_on: 1.hour.ago)]) }
    has_unread true
    viewed_on { 2.hour.ago }
  end
end
