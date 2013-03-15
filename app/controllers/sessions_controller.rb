# This controller handles the login/logout function of the site.  
class SessionsController < ApplicationController
  # render new.rhtml
  def new
    if Member.count == 0
      redirect_to sign_up_path
    end
  end

  def create
    session[:member_id] = Member.authenticate(params[:username], params[:password])
    if logged_in?
      redirect_to '/'
      flash[:notice] = "Signed in successfully"
    else
      flash[:notice] = "Cannot sign in"
      render :action => :new
    end
  end

  def destroy
    session[:member_id] = nil if logged_in?
    reset_session
    flash[:notice] = "You have been signed out."
    redirect_back_or_default "/"
  end
end
