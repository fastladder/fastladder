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
  attr_accessible :feed_id, :has_unread, :folder_id, :rate, :public, :viewed_on
  belongs_to :member
  belongs_to :feed
  belongs_to :folder
  before_create :update_public_fields
  after_create  :update_subscribers_count
  after_destroy :update_subscribers_count

  scope :public, ->{ where(public: true) }
  scope :has_unread, ->{ where(has_unread: true) }

  def update_public_fields
    self.public ||= false
    true
  end

  def update_subscribers_count
    self.feed.update_subscribers_count
  end
end
