class UserController < ApplicationController
  def index
    @target_member = Member.where(username: params[:login_name]).first
    @subscriptions = @target_member.subscriptions.where(public: true).order("created_on DESC").limit(30) if @target_member.public
    respond_to do |format|
      format.html
      format.rss { render layout: false }
      format.opml { render layout: false }
    end
  end
end
