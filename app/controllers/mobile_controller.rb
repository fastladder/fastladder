# frozen_string_literal: true

class MobileController < ApplicationController # rubocop:todo Style/Documentation
  before_action :login_required
  layout false

  def index
    @subscriptions = current_member.subscriptions.includes(:feed).has_unread.order('rate desc').with_unread_count.select do
      _1.unread_count.positive?
    end
  end

  def read_feed
    @subscription = Subscription.find(params[:feed_id])
    @items = @subscription.feed.items.stored_since(@subscription.viewed_on).order('stored_on asc').limit(200)
  end

  def mark_as_read
    @subscription = Subscription.find(params[:feed_id])
    @subscription.update!(has_unread: false, viewed_on: Time.at(params[:timestamp].to_i + 1))

    redirect_to '/mobile'
  end

  def pin
    item = Item.find(params[:item_id])
    begin
      current_member.pins.create!(link: item.link, title: item.title)
    rescue ActiveRecord::RecordNotUnique
    end

    redirect_to "/mobile/#{item.feed_id}#item-#{item.id}"
  end
end
