class UserController < ApplicationController
  def index
    @target_member = Member.where(username: params[:login_name]).first
    @subscriptions = @target_member.subscriptions.where(:public => true).order("created_on DESC").limit(30) if @target_member.public
    respond_to do |format|
      format.html
      format.rss { render layout: false }
      format.opml { render layout: false }
    end
  end

  def rss
    @member = Member.where(username: params[:login_name]).first
    @subscriptions = @member.subscriptions.public.recent(30).all
    render action: :index, formats: [:rss], type: :builder
  end

  def opml
    @member = Member.where(username: params[:login_name]).first
    render action: :index, formats: [:opml], type: :builder
  end
end
