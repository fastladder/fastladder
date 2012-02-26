class Subscription < ActiveRecord::Base
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
