# == Schema Information
#
# Table name: items
#
#  id             :integer          not null, primary key
#  feed_id        :integer          default(0), not null
#  link           :string(255)      default(""), not null
#  title          :text             not null
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

class Item < ActiveRecord::Base
  belongs_to :feed
  validates :guid, presence: true, uniqueness: { scope: :feed_id }

  before_validation :default_values
  before_save :create_digest, :fill_datetime

  scope :stored_since, ->(viewed_on){ viewed_on ? where("stored_on >= ?", viewed_on) : all }
  scope :recent, ->(limit = nil, offset = nil){ order("created_on DESC, id DESC").limit(limit).offset(offset) }

  def default_values
    self.title ||= ""
    self.guid ||= self.link
  end

  def fill_datetime
    self.stored_on = Time.now unless self.stored_on
  end

  def create_digest
    str = "#{self.title}#{self.body}"
    str.gsub!(%r{<br clear="all"\s*/>\s*<a href="http://rss\.rssad\.jp/(.*?)</a>\s*<br\s*/>}im, "")
    str = str.gsub(/\s+/, "")
    digest = Digest::SHA1.hexdigest(str)
    self.digest = digest
  end

  def as_json(options = {})
    result = {}
    result[:created_on] = self.created_on ? self.created_on.to_time.to_i : 0
    result[:modified_on] = self.modified_on ? self.modified_on.to_time.to_i : 0
    result[:id] = self.id
    result[:enclosure_type] = self.enclosure_type if self.enclosure_type
    result[:enclosure] = (self.enclosure || "").purify_uri if self.enclosure
    %i(title author category).each do |s|
      result[s] = (self.send(s) || "").purify_html
    end
    result[:link] = (self.link || "").purify_uri
    result[:body] = (self.body || "").scrub_html
    result
  end
end
