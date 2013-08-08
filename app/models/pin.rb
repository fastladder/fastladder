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

  scope :past, ->(num){ order("created_on").limit(num) }

  after_create :destroy_over_limit_pins

  def as_json(options = {})
    result = {}
    result[:link] = self.link.purify_uri
    result[:title] = self.title.purify_html
    result[:created_on] = self.created_on.to_time.to_i
    result
  end

  # older pins are collectioned
  def destroy_over_limit_pins
    over_count = member.pins.size - Settings.save_pin_limit
    member.pins.past(over_count).destroy_all if over_count > 0
  end
end
