class ShareController < ApplicationController
  verify :session => :member, :redirect_to => "/login"
  def index

  end
end


