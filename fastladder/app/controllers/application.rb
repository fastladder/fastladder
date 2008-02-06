# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  include AuthenticatedSystem
  protect_from_forgery
  helper :all # include all helpers, all the time

  # See ActionController::RequestForgeryProtection for details
  # Uncomment the :secret if you're not using the cookie session store
  #protect_from_forgery # :secret => '74783b1d933c5a4a5d5fce16f13564db'
  before_filter :set_member
  NOTHING = { :nothing => true }

  def self.verify_nothing(options = {})
    verify options.merge(:render => NOTHING)
  end

  def self.verify_json(options = {})
    verify options.merge(:render => { :json => json_status(false) })
  end

  def self.json_status(success, option = nil)
    result = { :isSuccess => success, :ErrorCode => success ? 0 : 1 }
    case option
    when Integer
      result[:ErrorCode] = option
    when Hash
      result.merge!(option)
    end
    result.to_json
  end

  def render_json(json, callback = nil, status = nil)
    result = super(json, callback, status)
    response.content_type = Mime::JS
    result
  end

  def json_status(success, option = nil)
    self.class.json_status(success, option)
  end

  def render_json_status(success, option = nil)
    render :json => json_status(success, option)
  end
  
  def member
    return @member if @member
    begin
      return @member = Member.find(session[:member])
    rescue
      reset_session
      flash[:notice] = "You have been logged out."
      redirect_back_or_default "/"
    end
  end

  def set_member
    if (member_id = (session[:member] || 0).to_i) > 0
      unless @member = Member.find_by_id(member_id)
        reset_session
        redirect_to "/"
      end
    end
    true
  end
end
