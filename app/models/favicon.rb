# == Schema Information
#
# Table name: favicons
#
#  id      :integer          not null, primary key
#  feed_id :integer          default(0), not null
#  image   :binary
#
# Indexes
#
#  index_favicons_on_feed_id  (feed_id) UNIQUE
#

class Favicon < ActiveRecord::Base
  belongs_to :feed
end
