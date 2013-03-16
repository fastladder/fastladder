# == Schema Information
#
# Table name: subscriptions
#
#  id            :integer          not null, primary key
#  member_id     :integer          default(0), not null
#  folder_id     :integer
#  feed_id       :integer          default(0), not null
#  rate          :integer          default(0), not null
#  has_unread    :boolean          default(FALSE), not null
#  public        :boolean          default(TRUE), not null
#  ignore_notify :boolean          default(FALSE), not null
#  viewed_on     :datetime
#  created_on    :datetime         not null
#  updated_on    :datetime         not null
#
# Indexes
#
#  index_subscriptions_on_feed_id                (feed_id)
#  index_subscriptions_on_folder_id              (folder_id)
#  index_subscriptions_on_member_id_and_feed_id  (member_id,feed_id) UNIQUE
#

class Subscription < ActiveRecord::Base
  attr_accessible :feed_id, :has_unread, :folder_id, :rate, :public, :viewed_on
  belongs_to :member
  belongs_to :feed
  belongs_to :folder

  def before_create
    self.public ||= false
    true
  end

  def after_create
    self.feed.update_subscribers_count
  end

  def after_destroy
    self.feed.update_subscribers_count
  end
end
