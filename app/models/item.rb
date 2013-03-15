# == Schema Information
#
# Table name: items
#
#  id             :integer          not null, primary key
#  feed_id        :integer          default(0), not null
#  link           :string(255)      default(""), not null
#  title          :text             default(""), not null
#  body           :text
#  author         :string(255)
#  category       :string(255)
#  enclosure      :string(255)
#  enclosure_type :string(255)
#  digest         :string(255)
#  version        :integer          default(1), not null
#  stored_on      :datetime
#  modified_on    :datetime
#  created_on     :datetime         not null
#  updated_on     :datetime         not null
#
# Indexes
#
#  index_items_on_feed_id_and_link  (feed_id,link) UNIQUE
#  items_search_index               (feed_id,stored_on,created_on,id)
#

require "string_utils"

class Item < ActiveRecord::Base
  attr_accessible :feed_id, :link, :title, :body, :author, :category, :enclosure, :enclosure_type, :digest, :stored_on, :modified_on
  belongs_to :feed

  def to_json(options = {})
    result = {}
    result[:created_on] = self.created_on ? self.created_on.to_time.to_i : 0
    result[:modified_on] = self.modified_on ? self.modified_on.to_time.to_i : 0
    result[:id] = self.id
    result[:enclosure_type] = self.enclosure_type if self.enclosure_type
    result[:enclosure] = (self.enclosure || "").purify_uri if self.enclosure
    %w(title author category).each do |s|
      result[s.to_sym] = (self.send(s) || "").purify_html
    end
    result[:link] = (self.link || "").purify_uri
    result[:body] = (self.body || "").scrub_html
    result.to_json
  end
end
