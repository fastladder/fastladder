# == Schema Information
#
# Table name: pins
#
#  id         :integer          not null, primary key
#  member_id  :integer          default(0), not null
#  link       :string(255)      default(""), not null
#  title      :string(255)
#  created_on :datetime         not null
#  updated_on :datetime         not null
#

class Pin < ActiveRecord::Base
  belongs_to :member

  attr_accessible :link, :title

  def to_json(options = {})
    result = {}
    result[:link] = self.link.purify_uri
    result[:title] = self.title.purify_html
    result[:created_on] = self.created_on.to_time.to_i
    result.to_json
  end
end
