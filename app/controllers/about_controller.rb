class AboutController < ApplicationController
  before_action :login_required, only: :update

  def index
    url = url_from_path(:url) unless params[:url].blank?
    @feed = Feed.find_by(feedlink: url) unless url.blank?
    unless @feed.nil?
      @is_feedlink = true
      respond_to do |format|
        format.json { render json: @feed.to_json }
        format.any { render action: :index, formats: [:html] }
      end
    else
      respond_to do |format|
        format.html { render file: "#{Rails.root}/public/404.html", status: :not_found }
        format.json { render json: @feed.to_json } # for backward compatibility
        format.any { head :not_found }
      end
    end
  end

  def update
    url = url_from_path(:url) unless params[:url].blank?
    feed = Feed.find_by(feedlink: url) unless url.blank?
    if feed
      feed.update!(ignore_body_update: params[:ignore_body_update].present?)
      redirect_to about_path(url: feed.feedlink)
    else
      render file: "#{Rails.root}/public/404.html", status: :not_found
    end
  end
end

