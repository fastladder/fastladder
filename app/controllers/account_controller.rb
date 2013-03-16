class AccountController < ApplicationController
  before_filter :login

  def password
    if request.post?
      unless @member.authenticated?(params[:password])
        @member.errors.add :password, "is invalid"
        return
      end
      @member.crypted_password = ""
      @member.password = params[:new_password]
      @member.password_confirmation = params[:new_password_confirmation]
      @member.save
    end
  end

  def apikey
    @member.set_auth_key if request.post?
  end
end
