class ApiController < ApplicationController
  before_action :login_required_api
  params_required :subscribe_id, only: :touch_all
  params_required [:timestamp, :subscribe_id], only: :touch
  params_required :since, only: [:item_count, :unread_count]
  before_action :find_sub, only: [:all, :unread]
  skip_before_action :verify_authenticity_token

  def all
    if params[:limit].blank?
      limit = Settings.max_unread_count
    else
      limit = params[:limit].to_i
      if limit <= 0 or Settings.max_unread_count < limit
        limit = Settings.max_unread_count
      end
    end
    offset = params[:offset].blank? ? 0 : params[:offset].to_i
    items = @sub.feed.items.recent(limit, offset)
    result = {
      subscribe_id: @id,
      channel: @sub.feed,
      items: items,
    }
    result[:ignore_notify] = 1 if @sub.ignore_notify
    render json: result.to_json
  end

  def unread
    items = @sub.feed.items.stored_since(@sub.viewed_on).recent(Settings.max_unread_count)
    result = {
      subscribe_id: @id,
      channel: @sub.feed,
      items: items,
    }
    if items.length > 0
      result[:last_stored_on] = items.max { |a, b| a.stored_on <=> b.stored_on }.stored_on
    end
    result[:ignore_notify] = 1 if @sub.ignore_notify
    render json: result.to_json
  end

  def touch_all
    params[:subscribe_id].split(/\s*,\s*/).each do |id|
      if sub = @member.subscriptions.find_by(id: id)
        sub.update_attributes(has_unread: false, viewed_on: DateTime.now)
      end
    end
    render_json_status(true)
  end

  def touch
    timestamps = params[:timestamp].split(/\s*, \s*/).map { |t| t.to_i }
    params[:subscribe_id].split(/\s*,\s*/).each_with_index do |id, i|
      if sub = Subscription.find(id) and sub.member_id == @member.id and timestamps[i]
        sub.update_attributes(has_unread: false, viewed_on: Time.at(timestamps[i] + 1))
      end
    end
    render_json_status(true)
  end

  def item_count
    render json: count_items(unread: false).to_json
  end

  def unread_count
    render json: count_items(unread: true).to_json
  end

  def subs
    limit = (params[:limit] || 0).to_i
    from_id = (params[:from_id] || 0).to_i
    items = []
    subscriptions = @member.subscriptions
    subscriptions = subscriptions.has_unread if params[:unread].to_i != 0
    subscriptions.order("subscriptions.id").includes(:folder, { feed: :crawl_status }).each do |sub|
      unread_count = sub.feed.items.stored_since(sub.viewed_on).count
      next if params[:unread].to_i > 0 and unread_count == 0
      next if sub.id < from_id
      feed = sub.feed
      modified_on = feed.modified_on
      item = {
        subscribe_id: sub.id,
        unread_count: [unread_count, Settings.max_unread_count].min,
        folder: (sub.folder ? sub.folder.name : "").utf8_roundtrip.html_escape,
        tags: [],
        rate: sub.rate,
        public: sub.public ? 1 : 0,

        link: feed.link.html_escape,
        feedlink: feed.feedlink.html_escape,
        title: feed.title.utf8_roundtrip.html_escape,
        icon: feed.favicon.try(:image).try!(:blank?) ? "/img/icon/default.png" : favicon_path(feed.id),
        modified_on: modified_on ? modified_on.to_time.to_i : 0,
        subscribers_count: feed.subscribers_count,
      }
      if sub.ignore_notify
        item[:ignore_notify] = 1
      end
      items << item
      if limit > 0 and limit <= items.size
        break
      end
    end
    render json: items.to_json
  end

  def lite_subs
    items = []
    @member.subscriptions.includes(:folder, :feed).each do |sub|
      feed = sub.feed
      modified_on = feed.modified_on
      item = {
        subscribe_id: sub.id,
        folder: (sub.folder ? sub.folder.name : "").utf8_roundtrip.html_escape,
        rate: sub.rate,
        public: sub.public ? 1 : 0,
        link: feed.link.html_escape,
        feedlink: feed.feedlink.html_escape,
        title: feed.title.utf8_roundtrip.html_escape,
        icon: feed.favicon.try(:image).try!(:blank?) ? "/img/icon/default.png" : favicon_path(feed.id),
        modified_on: modified_on ? modified_on.to_time.to_i : 0,
        subscribers_count: feed.subscribers_count,
      }
      if sub.ignore_notify
        item[:ignore_notify] = 1
      end
      items << item
    end
    render json: items.to_json
  end

  def error_subs
  end

  def folders
    names = []
    name2id = {}
    @member.folders.each do |folder|
      name = (folder.name || "").utf8_roundtrip.html_escape
      names << name
      name2id[name] = folder.id
    end
    render json: {
      names: names,
      name2id: name2id,
    }.to_json
  end

  def crawl
    success = false
    params[:subscribe_id].to_s.split(/\s*,\s*/).each_with_index do |id, i|
      if sub = Subscription.find(id) and sub.member_id == @member.id
        success = sub.feed.crawl
      end
    end
    render json: {a: (success ? true : false) }.to_json
    # render_json_status(success ? true : false)
    # return render_json_status(success ? true : false)
  end

  protected

  def find_sub
    @id = (params[:subscribe_id] || params[:id] || 0).to_i
    unless @sub = @member.subscriptions.includes(:feed).find_by(id: @id)
      render NOTHING
      return false
    end
    return true
  end

  def count_items(options = {})
    subscriptions = @member.subscriptions
    subscriptions = subscriptions.has_unread if options[:unread]
    stored_on_list = subscriptions.order("id").map do |sub|
      {
        subscription: sub,
        stored_on: sub.feed.items.select("stored_on").order("stored_on DESC").limit(Settings.max_unread_count).map { |item| item.stored_on.to_time },
      }
    end
    counts = []
    params[:since].split(/,/).each do |s|
      param_since = s =~ /^\d+$/ ? Time.new(s.to_i) : Time.parse(s)
      counts << stored_on_list.inject(0) do |sum, pair|
        since = options[:unread] ? [param_since, pair[:subscription].viewed_on.to_time].max : param_since
        sum + pair[:stored_on].find_all { |stored_on| stored_on > since }.size
      end
    end
    if counts.size == 1
      return counts[0]
    end
    counts
  end
end
