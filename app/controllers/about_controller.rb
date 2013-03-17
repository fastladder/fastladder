class AboutController < ApplicationController
 def index
    url = url_from_path(:url) unless params[:url].blank?
    @member = Member.where(id: session[:member_id]).first
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

