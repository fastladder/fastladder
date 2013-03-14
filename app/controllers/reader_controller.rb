class ReaderController < ApplicationController
  #verify :session => :member, :redirect_to => "/login"
  before_filter :login

  def welcome
    redirect_to :action => :index, :trailing_slash => true
  end

  def index
    render layout:false
  end
end
