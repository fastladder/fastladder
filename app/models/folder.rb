class Folder < ActiveRecord::Base
  belongs_to :member
  has_many :subscriptions, :dependent => :nullify
  has_many :feeds, :through => :subscriptions
end
