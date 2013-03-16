class AboutController < ApplicationController
  def index
    url = request.original_fullpath.slice(7..-1) unless params[:url].blank?
    @feed = Feed.find_by_feedlink(url) unless url.blank?
    unless @feed.nil?
      @is_feedlink = true
      respond_to do |format|
        format.html { render action: :index }
        format.json { render json: @feed.to_json }
      end 
    else
      respond_to do |format|
        format.html { render file: "#{Rails.root}/public/404.html", status: :not_found }
        format.json { render json: @feed.to_json } # for backward compatibility
        format.any { head :not_found }
      end 
    end 
  end 
end

