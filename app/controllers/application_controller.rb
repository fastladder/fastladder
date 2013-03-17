class ApplicationController < ActionController::Base
  protect_from_forgery

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


  def login
    @member = Member.where(id: session[:member_id]).first
    redirect_to login_path unless @member
  end

  def logged_in?
    !session[:member_id].blank?
  end

  def self.verify_json(options = {})
    verify options.merge(:render => { :json => json_status(false) })
  end
  
  NOTHING = { :nothing => true }
  def self.verify_nothing(options = {})
    verify options.merge(:render => NOTHING)
  end

  def json_status(success, option = nil)
    self.class.json_status(success, option)
  end
  
  def render_json_status(success, option = nil)
    render :json => json_status(success, option)
  end

  # extract URL from request_path(e.g. /about/http://example.com)
  def url_from_path(name)
    # params[name] is http:/example.com because of squeeze("/")
    path = url_for(name => ".", :only_path => true)
    request.original_fullpath.slice(path.size-1..-1)
  end
end
