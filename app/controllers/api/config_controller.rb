require "yaml"
class Api::ConfigController < ApplicationController
  before_action :login_required_api
  skip_before_action :verify_authenticity_token

  APP_CONFIG = Settings.to_h.slice('save_pin_limit')

  def getter
    render json: (@member.config_dump || {}).merge(APP_CONFIG).to_json
  end

  def setter
    if (pub = params[:member_public]) and pub =~ /^[01]$/
      @member.public = pub.to_i != 0
    end
    config = @member.config_dump || {}
    params.each do |key, value|
      unless %w(action controller member_public).include? key
        config[key] = value
      end
    end
    if config.to_yaml.length < 100000
      @member.config_dump = config
    end
    @member.save
    render json: config.to_json
  end
end
