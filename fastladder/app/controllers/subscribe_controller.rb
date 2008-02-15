require "fastladder/feedfinder"
require "open-uri"
require "feed-normalizer"

class SubscribeController < ApplicationController
  verify_nothing :session => :member
  # verify_json :params => :feedlink, :only => :subscribe
  # Ffeed = Struct.new('Candidates', :link, :feedlink, :title, :subscribers_count, :subscribe_id)

  def index
    if params[:url]
      return self.confirm
    end
  end
  
  def confirm
    if request.post?
      return self.subscribe
    end
    feeds = []
    Rfeedfinder.feeds(params[:url]).each do |feedlink|
      if feed = Feed.find_by_feedlink(feedlink)
        if sub = member.subscribed(feed)
          feed[:subscribe_id] = sub.id
        end
        feeds << feed
        next
      end
      unless feed_dom = FeedNormalizer::FeedNormalizer.parse(Crawler::simple_fetch(feedlink))
        next
      end
      feeds << Feed.new({
        :subscribers_count => 0,
        :feedlink => feedlink,
        :link => feed_dom.urls[0] || feedlink,
        :title => feed_dom.title || feed_dom.link || "",
      })
    end
    if feeds.empty?
      flash[:notice] = "please check URL"
      return (redirect_to :action => "index")
    end
    @feeds = feeds
    render :action => "confirm"
  end

protected
  def subscribe
    unless params[:check_for_subscribe]
      flash[:notice] = "please check for subscribe"
      return (redirect_to :action => "confirm", :url => params[:url])
    end
    options = {
      :public => params[:public],
      :rate => params[:rate].to_i
    }
    unless (folder_id = params[:folder_id].to_i) > 0
      folder_id = nil
    end
    options[:folder_id] = folder_id
    params[:check_for_subscribe].values.each do |feedlink|
      member.subscribe_feed(feedlink, options)
    end
    # render :json => params.to_json
    redirect_to :controller => "reader"
  end
end
