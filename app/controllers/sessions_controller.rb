# This controller handles the login/logout function of the site.  
class SessionsController < ApplicationController
  # render new.rhtml
  def new
    if Member.count == 0
      redirect_to "/signup"
    end
  end

  def create
    self.current_member = Member.authenticate(params[:username], params[:password])
    if logged_in?
      if params[:remember_me] == "1"
        self.current_member.remember_me
        cookies[:auth_token] = { :value => self.current_member.remember_token , :expires => self.current_member.remember_token_expires_at }
      end
      redirect_back_or_default "/"
      flash[:notice] = "Signed in successfully"
    else
      flash[:notice] = "Cannot sign in"
      render :action => :new
    end
  end

  def destroy
    self.current_member.forget_me if logged_in?
    cookies.delete :auth_token
    reset_session
    flash[:notice] = "You have been signed out."
    redirect_back_or_default "/"
  end
end
