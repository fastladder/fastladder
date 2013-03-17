# == Schema Information
#
# Table name: favicons
#
#  id      :integer          not null, primary key
#  feed_id :integer          default(0), not null
#  image   :binary
#

class Favicon < ActiveRecord::Base
  attr_accessible :image, :feed
  belongs_to :feed
end
