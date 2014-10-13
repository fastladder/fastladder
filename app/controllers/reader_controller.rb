class ReaderController < ApplicationController
  before_action :login_required

  def welcome
    redirect_to action: :index, trailing_slash: true
  end

  def index
    render layout: false
  end
end
