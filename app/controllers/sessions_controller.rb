# This controller handles the login/logout function of the site.
class SessionsController < ApplicationController
  def new
    redirect_to sign_up_path if Member.count == 0
  end

  def create
    member = Member.authenticate(params[:username], params[:password])
    session[:member_id] = member.try!(:id)
    if logged_in?
      redirect_to root_path, notice: "Signed in successfully"
    else
      flash[:alert] = "Cannot sign in"
      render :new
    end
  end

  def destroy
    if logged_in?
      session[:member_id] = nil
      @member = nil
    end
    reset_session
    redirect_to root_url, notice: "You have been signed out."
  end
end
