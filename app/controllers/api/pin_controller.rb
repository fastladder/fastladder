class Api::PinController < ApplicationController
  before_action :login_required_api
  params_required [:link, :title], only: :add
  params_required :link, only: :remove
  skip_before_action :verify_authenticity_token

  module ErrorCode
    NOT_FOUND = 2
  end

  def all
    render json: current_member.pins
  end

  def add
    current_member.pins.find_or_create_by(link: params[:link]) do |pin|
      pin.title = params[:title]
    end
    render_json_status(true)
  end

  def remove
    unless pin = current_member.pins.find_by(link: params[:link])
      return render_json_status(false, ErrorCode::NOT_FOUND)
    end
    pin.destroy
    render_json_status(true)
  end

  def clear
    current_member.pins.destroy_all
    render_json_status(true)
  end
end
