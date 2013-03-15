class Subscription < ActiveRecord::Base
  attr_accessible :feed_id, :has_unread, :folder_id, :rate, :public, :viewed_on
  belongs_to :member
  belongs_to :feed
  belongs_to :folder
  before_create :before_create
  after_create  :after_create
  after_destroy :after_destroy

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
