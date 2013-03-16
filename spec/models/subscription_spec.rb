# -*- coding: utf-8 -*-
require 'spec_helper'

describe Subscription do
  describe 'creation' do
    it 'update subscribers count' do
      feed = mock_model(Feed)
      feed.should_receive(:update_subscribers_count)

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

      subscription.public.should == false
    end
  end

  describe 'destroy' do
    it 'update subscribers count' do
      feed = stub_model(Feed)
      subscription = Subscription.new
      subscription.feed = feed
      subscription.save

      feed.should_receive(:update_subscribers_count)
      subscription.destroy
    end
  end
end
