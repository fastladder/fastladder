require "string_utils"
class Pin < ActiveRecord::Base
  belongs_to :member

  def to_json(options = {})
    result = {}
    result[:link] = self.link.purify_uri
    result[:title] = self.title.purify_html
    result[:created_on] = self.created_on.to_time.to_i
    result.to_json
  end
end
