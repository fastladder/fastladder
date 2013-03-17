# == Schema Information
#
# Table name: feeds
#
#  id                :integer          not null, primary key
#  feedlink          :string(255)      not null
#  link              :string(255)      not null
#  title             :text             default(""), not null
#  description       :text             default(""), not null
#  subscribers_count :integer          default(0), not null
#  image             :string(255)
#  icon              :string(255)
#  modified_on       :datetime
#  created_on        :datetime         not null
#  updated_on        :datetime         not null

require 'spec_helper'

describe Feed do
  describe "fetch favicon" do
    it "favicon.ico store as PNG" do
      feed = Factory(:feed)
      feed.fetch_favicon!
      feed.favicon.image.start_with?("\x89PNG\r\n".force_encoding('ascii-8bit')).should be_true
    end

    it "complex favicon url detection" do
      # <link rel="shortcut icon" href="http://cdn.image.st-hatena.com/image/favicon/6b9137a793a9f489e05eda5e4ad702443965775e/version=1/http%3A%2F%2Fcdn.mogile.archive.st-hatena.com%2Fv1%2Fimage%2Fbike-o%2F171679000384244621.gif">
      feed = Factory(:feed, :link => "http://bike-o.hatenablog.com/", :feedlink => "http://bike-o.hatenablog.com/feed")
      feed.fetch_favicon!
      feed.favicon.image.start_with?("\x89PNG\r\n".force_encoding('ascii-8bit')).should be_true
    end
  end
end
