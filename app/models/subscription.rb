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

class Subscription < ActiveRecord::Base
  belongs_to :member, optional: true
  belongs_to :feed, optional: true
  belongs_to :folder, optional: true
  before_create :update_public_fields
  after_create  :update_subscribers_count
  after_destroy :update_subscribers_count

  scope :open, ->{ where(public: true) }
  scope :has_unread, ->{ where(has_unread: true) }
  scope :recent, ->(num){ order("created_on DESC").limit(num) }
  scope :with_unread_count, ->{
    select("subscriptions.*, (select count(0) from items where feed_id = subscriptions.id and stored_on >= viewed_on) as unread_count")
  }

  def update_public_fields
    self.public ||= false
    true
  end

  def update_subscribers_count
    self.feed.update_subscribers_count
  end
end
