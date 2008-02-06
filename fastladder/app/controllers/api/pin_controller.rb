class Api::PinController < ApplicationController
  verify_nothing :session => :member
  #verify_nothing :method => :post
  verify_json :params => [:link, :title], :only => :add
  verify_json :params => :link, :only => :remove
  skip_before_filter :verify_authenticity_token
  
  def all
    render :json => member.pins.to_json
  end

  def add
    link = params[:link]
    title = params[:title]
    member.pins.create(:link => link, :title => title)
    if (diff = member.pins.size - SAVE_PIN_LIMIT) > 0
      member.pins.find(:all, :order => "created_on", :limit => diff).each do |pin|
        pin.destroy
      end
    end
    render_json_status(true)
  end

  def remove
    unless pin = member.pins.find_by_link(params[:link])
      return render_json_status(false, 2)
    end
    pin.destroy
    render_json_status(true)
  end

  def clear
    Pin.delete_all(:member_id => member.id)
    render_json_status(true)
  end
end
