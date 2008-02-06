require "string_utils"
class Item < ActiveRecord::Base
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
