require "string_utils"

class AboutController < ApplicationController
  def index
    url = request.original_fullpath.slice(7..-1) unless params[:url].blank?
    if url && @feed = Feed.find_by_feedlink(url)
      @is_feedlink = true
      return render :action => "index"
    end
    render :json => @feed.to_json
  end
end
