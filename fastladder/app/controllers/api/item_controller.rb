class Api::ItemController < ApplicationController
  verify_nothing :session => :member

  def mark_unread
    render_json_status(true)
  end
end
