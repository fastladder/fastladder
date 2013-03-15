class UserController < ApplicationController
  def index
    @target = Member.where(username: params[:login_name]).first
    @username = @target.username
    @recent = @target.subscriptions.where(public: true).order('created_on DESC').limit(30).all
    respond_to do |format|
      format.html
      format.rss { render layout: false }
      format.opml { render layout: false }
    end
  end

  def rss
    @target = Member.where(username: params[:login_name]).first
    @username = @target.username
    @recent = @target.subscriptions.public.order('created_on DESC').limit(30).all
    render action: :index, formats: [:rss], type: :builder
  end

  def opml
    @target = Member.where(username: params[:login_name]).first
    @username = @target.username
    render action: :index, formats: [:opml], type: :builder
  end
end
