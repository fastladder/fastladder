class SubscribeController < ApplicationController
  before_action :login_required

  def index
    if params[:url].present?
      return self.confirm
    end
  end

  def confirm
    feeds = []
    # params[:url] is http:/example.com because of squeeze("/")
    @url = url_from_path(:url)
    FeedSearcher.search(@url).each do |feedlink|
      if feed = Feed.find_by(feedlink: feedlink)
        if sub = current_member.subscribed(feed)
          feed.subscribe_id = sub.id
        end
        feeds << feed
        next
      end
      feed = Feed.initialize_from_uri(feedlink)
      next unless feed
      feeds << feed
    end
    if feeds.empty?
      flash[:notice] = "please check URL"
      return (redirect_to action: "index")
    end
    @feeds = feeds
    render action: "confirm"
  end

  def subscribe
    unless params[:check_for_subscribe]
      flash[:notice] = "please check for subscribe"
      return (redirect_to action: "confirm", url: params[:url])
    end
    options = {
      public: params[:public],
      rate: params[:rate].to_i
    }
    unless (folder_id = params[:folder_id].to_i) > 0
      folder_id = nil
    end
    options[:folder_id] = folder_id
    params[:check_for_subscribe].each do |feedlink|
      @member.subscribe_feed(feedlink, options)
    end
    # render json: params.to_json
    redirect_to controller: "reader"
  end
end
