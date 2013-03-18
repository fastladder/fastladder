class ContentsController < ApplicationController
  before_filter :login_required

  def configure
    render layout:false
  end

  def guide
    render layout:false
  end
end
