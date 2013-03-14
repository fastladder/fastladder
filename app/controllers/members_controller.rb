class MembersController < ApplicationController
  # render new.rhtml
  def new
  end

  def create
    cookies.delete :auth_token
    # protects against session fixation attacks, wreaks havoc with 
    # request forgery protection.
    # uncomment at your own risk
    # reset_session
    @member = Member.new(params[:member])
    @member.save!
    session[:member_id] = @member.id
    redirect_back_or_default('/')
    flash[:notice] = "Thanks for signing up!"
  rescue ActiveRecord::RecordInvalid
    flash[:error] = @member.errors.map{|x| x}.join(' ')
    render :action => 'new'
  end
end
