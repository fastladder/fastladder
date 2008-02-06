require "string_utils"

class AboutController < ApplicationController
  def index
    url = params[:url]
    if @feed = Feed.find_by_feedlink(url)
      @is_feedlink = true
      return render :action => "index"
    end
    render :json => @feed.to_json
  end
end
