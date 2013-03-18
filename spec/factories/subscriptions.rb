# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :subscription do
    feed { FactoryGirl.create(:feed) }
  end
end
