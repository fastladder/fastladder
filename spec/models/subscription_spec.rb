# -*- coding: utf-8 -*-
# == Schema Information
#
# Table name: subscriptions
#
#  id            :integer          not null, primary key
#  member_id     :integer          default(0), not null
#  folder_id     :integer
#  feed_id       :integer          default(0), not null
#  rate          :integer          default(0), not null
#  has_unread    :boolean          default(FALSE), not null
#  public        :boolean          default(TRUE), not null
#  ignore_notify :boolean          default(FALSE), not null
#  viewed_on     :datetime
#  created_on    :datetime         not null
#  updated_on    :datetime         not null
#

require 'spec_helper'

describe Subscription do
  describe 'creation' do
    it 'update subscribers count' do
      feed = stub_model(Feed)
      expect(feed).to receive(:update_subscribers_count)

      subscription = Subscription.new
      subscription.feed = feed
      subscription.save
    end

    it 'set default value' do
      feed = stub_model(Feed)

      subscription = Subscription.new
      subscription.feed = feed
      subscription.public = nil
      subscription.save

      expect(subscription.public).to eq(false)
    end
  end

  describe 'destroy' do
    it 'update subscribers count' do
      feed = stub_model(Feed)
      subscription = Subscription.new
      subscription.feed = feed
      subscription.save

      expect(feed).to receive(:update_subscribers_count)
      subscription.destroy
    end
  end
end
