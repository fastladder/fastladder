require "test_helper"

class MemberTest < ActiveSupport::TestCase
  test "authenticate with correct password" do
    member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
    assert Member.authenticate("bulkneets", "mala")
  end

  test "authenticate with incorrect password" do
    member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
    assert_nil Member.authenticate("bulkneets", "ssig33")
  end

  test "public_subscribe_count returns count of public subscriptions" do
    member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
    FactoryBot.create(:subscription, member: member, feed: FactoryBot.create(:feed), public: true)
    FactoryBot.create(:subscription, member: member, feed: FactoryBot.create(:feed), public: false)
    FactoryBot.create(:subscription, member: member, feed: FactoryBot.create(:feed), public: false)
    assert_equal 1, member.public_subscribe_count
  end

  test "public_subs includes public subscription" do
    member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
    public_subscription = FactoryBot.create(:subscription, member: member, feed: FactoryBot.create(:feed), public: true)
    non_public_subscription = FactoryBot.create(:subscription, member: member, feed: FactoryBot.create(:feed), public: false)
    assert_includes member.public_subs, public_subscription
    refute_includes member.public_subs, non_public_subscription
  end

  test "recent_subs returns correct number of subscriptions" do
    member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
    sub_1 = FactoryBot.create(:subscription, member: member, feed: FactoryBot.create(:feed), created_on: 1.day.ago)
    sub_2 = FactoryBot.create(:subscription, member: member, feed: FactoryBot.create(:feed), created_on: 3.day.ago)
    sub_3 = FactoryBot.create(:subscription, member: member, feed: FactoryBot.create(:feed), created_on: 2.day.ago)
    sub_4 = FactoryBot.create(:subscription, member: member, feed: FactoryBot.create(:feed), created_on: 4.day.ago)
    assert_equal 3, member.recent_subs(3).size
  end

  test "recent_subs returns subscriptions in correct order" do
    member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
    sub_1 = FactoryBot.create(:subscription, member: member, feed: FactoryBot.create(:feed), created_on: 1.day.ago)
    sub_2 = FactoryBot.create(:subscription, member: member, feed: FactoryBot.create(:feed), created_on: 3.day.ago)
    sub_3 = FactoryBot.create(:subscription, member: member, feed: FactoryBot.create(:feed), created_on: 2.day.ago)
    sub_4 = FactoryBot.create(:subscription, member: member, feed: FactoryBot.create(:feed), created_on: 4.day.ago)
    assert_equal [sub_1, sub_3, sub_2], member.recent_subs(3)
  end
end
