class Api::ItemController < ApplicationController
  before_action :login_required_api

  def mark_unread
    render_json_status(true)
  end
end
