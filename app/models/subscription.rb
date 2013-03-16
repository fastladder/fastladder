class Subscription < ActiveRecord::Base
  attr_accessible :feed_id, :has_unread, :folder_id, :rate, :public, :viewed_on
  belongs_to :member
  belongs_to :feed
  belongs_to :folder
  before_create :update_public_fields
  after_create  :update_subscribers_count
  after_destroy :update_subscribers_count

  def update_public_fields
    self.public ||= false
    true
  end

  def update_subscribers_count
    self.feed.update_subscribers_count
  end
end
