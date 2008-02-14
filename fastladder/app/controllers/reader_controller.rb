class ReaderController < ApplicationController
  verify :session => :member, :redirect_to => "/login"
  layout nil, :only => :index

  def welcome
    redirect_to :action => :index, :trailing_slash => true
  end

  def index
    @language = (GetText.locale.language == 'ja') ? 'Japanese' : 'English'
  end
end
