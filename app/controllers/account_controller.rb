class AccountController < ApplicationController
  before_action :login_required

  def password
    if request.post?
      unless @member.authenticated?(params[:account][:password])
        @member.errors.add :password, "is invalid"
        return
      end
      @member.crypted_password = ""
      @member.password = params[:account][:new_password]
      @member.password_confirmation = params[:account][:new_password_confirmation]
      @member.save
    end
  end

  def apikey
    @member.set_auth_key if request.post?
  end
end
