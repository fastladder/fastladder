class ApplicationController < ActionController::Base
  protect_from_forgery

  helper_method :current_member, :logged_in?

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

  def login_required
    redirect_to login_path unless logged_in?
  end

  def logged_in?
    current_member.present?
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
    if (url = params[name]).present?
      if not (parsed_url = URI.parse(url)).is_a? URI::HTTP or parsed_url.host.nil?
        url = nil
      end
    end
    unless url.present?
      # params[name] is http:/example.com because of squeeze("/")
      path = url_for(name => ".", :only_path => true)
      url = request.original_fullpath.slice(path.size-1..-1)
    end
    url
  end

  private

  def current_member
    @member ||= Member.where(id: session[:member_id]).first
  end
end
