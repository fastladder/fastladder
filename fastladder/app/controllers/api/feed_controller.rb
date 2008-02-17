require "feed-normalizer"

class Api::FeedController < ApplicationController
  verify_nothing :session => :member
  #verify_nothing :method => :post, :except => [:discover, :subscribed]
  verify_json :params => :url, :only => :discover
  verify_json :params => :feedlink, :only => :subscribe
  verify_json :params => :subscribe_id, :only => [:unsubscribe, :update, :move]
  verify_json :params => [:subscribe_id, :rate], :only => :set_rate
  verify_json :params => [:subscribe_id, :ignore], :only => :set_notify
  verify_json :params => [:subscribe_id, :public], :only => :set_public
  skip_before_filter :verify_authenticity_token

  def discover
    feeds = []
    Rfeedfinder.feeds(params[:url]).each do |feedlink|
      if feed = Feed.find_by_feedlink(feedlink)
        result = {
          :subscribers_count => feed.subscribers_count,
          :feedlink => feed.feedlink,
          :link => feed.link,
          :title => feed.title,
        }
        if sub = member.subscriptions.find_by_feed_id(feed.id)
          result[:subscribe_id] = sub.id
        end
        feeds << result
      else
        unless feed_dom = FeedNormalizer::FeedNormalizer.parse(Fastladder::simple_fetch(feedlink))
          next
        end
        feeds << {
          :subscribers_count => 0,
          :feedlink => feedlink,
          :link => feed_dom.urls[0] || feedlink,
          :title => feed_dom.title || feed_dom.link || "",
        }
      end
    end
    render :json => feeds.to_json
  end

  def subscribe
    feedlink = params[:feedlink]
    options = {
      :folder_id => 0,
      :rate => 0,
      :public => member.default_public,
    }
    if params[:folder_id]
      folder_id = params[:folder_id].to_i
      if member.folders.exists?(folder_id)
        options[:folder_id] = folder_id
      else
        return render_json_status(false)
      end
    end
    if rate = params[:rate] and (0..5).include?(rate = rate.to_i)
      options[:rate] = rate
    end
    if pub = params[:public]
      options[:public] = pub.to_i != 0
    end

    unless sub = subscribe_feed(feedlink, options)
      return render_json_status(false)
    end
    render_json_status(true, :subscribe_id => sub.id)
  end

  def unsubscribe
    unless sub = self.get_subscription
      return render_json_status(false)
    end
    sub.destroy
    render_json_status(true)
  end

  def subscribed
    feedlink = params[:feedlink]
    sub_id = (params[:subscribe_id] || 0).to_i
    sub = nil
    if sub_id > 0
      sub = member.subscriptions.find_by_id(sub_id)
    else
      if feedlink.blank? or (feed = Feed.find_by_feedlink(feedlink)).nil?
        return render_json_status(false)
      end
      sub = member.subscriptions.find_by_feed_id(feed.id)
    end
    unless sub
      return render_json_status(false)
    end
    result = {
      :ApiKey => session.session_id,
      :subscribe_id => sub.id,
      :folder_id => sub.folder_id || 0,
      :rate => sub.rate,
      :public => sub.public ? 1 : 0,
      :ignore_notify => sub.ignore_notify ? 1 : 0,
      :created_on => sub.created_on.to_time.to_i,
    }
    render :json => result.to_json
  end

  def update
    unless sub = self.get_subscription
      return render_json_status(false)
    end
    updated = false
    if params[:rate] =~ /^[0-5]$/
      sub.rate = params[:rate].to_i
      updated = true
    end
    if params[:public] =~ /^[01]$/
      sub.public = params[:public].to_i == 1
      updated = true
    end
    if (folder_id = params[:folder_id].to_i) > 0 and member.folders.exists?(folder_id)
      sub.folder_id = folder_id
      updated = true
    end
    if params[:ignore_notify] =~ /^[01]$/
      sub.ignore_notify = params[:ignore_notify].to_i == 1
      updated = true
    end
    if updated
      sub.save
    end
    render_json_status(true)
  end

  def move
    dest = params[:to]
    if dest.blank?
      folder_id = nil
    else
      unless folder = member.folders.find_by_name(dest)
        unless folder = member.folders.find_by_id(dest.to_i)
          return render_json_status(false)
        end
      end
      folder_id = folder.id
    end
    (params[:subscribe_id] || "").split(/\s*,\s*/).each do |id|
      if sub = member.subscriptions.find_by_id(id)
        sub.update_attribute(:folder_id, folder_id)
      end
    end
    render_json_status(true)
  end

  def set_rate
    unless sub = get_subscription
      return render_json_status(false)
    end
    if (rate = params[:rate]) =~ /^[0-5]$/
      sub.update_attribute(:rate, rate.to_i)
    end
    render_json_status(true)
  end

  def set_notify
    if (sub_id = params[:subscribe_id]).blank? or (ignore = params[:ignore]) !~ /^[01]$/
      return render_json_status(false)
    end
    ignore = ignore.to_i != 0
    sub_id.split(/\s*,\s*/).each do |id|
      if sub = member.subscriptions.find_by_id(id.to_i)
        sub.update_attribute(:ignore_notify, ignore)
      end
    end
    render_json_status(true)
  end

  def set_public
    if (sub_id = params[:subscribe_id]).blank? or (is_public = params[:public]) !~ /^[01]$/
      return render_json_status(false)
    end
    is_public = is_public.to_i != 0
    sub_id.split(/\s*,\s*/).each do |id|
      if sub = member.subscriptions.find_by_id(id.to_i)
        sub.update_attribute(:public, is_public)
      end
    end
    render_json_status(true)
  end

  def add_tags
  end

  def remove_tags
  end

protected
  def subscribe_feed(feedlink, options)
    member.subscribe_feed(feedlink, options)
  end

  def get_subscription
    if params[:subscribe_id].blank? or (sub_id = params[:subscribe_id].to_i) <= 0
      return nil
    end
    member.subscriptions.find_by_id(sub_id)
  end
end
