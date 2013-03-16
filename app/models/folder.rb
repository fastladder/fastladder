# == Schema Information
#
# Table name: folders
#
#  id         :integer          not null, primary key
#  member_id  :integer          default(0), not null
#  name       :string(255)      not null
#  created_on :datetime         not null
#  updated_on :datetime         not null
#
# Indexes
#
#  index_folders_on_member_id_and_name  (member_id,name) UNIQUE
#

class Folder < ActiveRecord::Base
  belongs_to :member
  has_many :subscriptions, :dependent => :nullify
  has_many :feeds, :through => :subscriptions

  attr_accessible :name
end
