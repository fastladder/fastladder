require "yaml"
class Api::ConfigController < ApplicationController
  protect_from_forgery = false
  verify_nothing :session => :member
  #verify_nothing :method => :post, :only => :put
  skip_before_filter :verify_authenticity_token

  def get
    render :json => (member.config_dump || {}).to_json
  end

  def put
    if (pub = params[:member_public]) and pub =~ /^[01]$/
      member.public = pub.to_i != 0
    end
    config = member.config_dump || {}
    params.each do |key, value|
      unless %w(action controller member_public).include? key
        config[key] = value
      end
    end
    if config.to_yaml.length < 100000
      member.config_dump = config
    end
    member.save
    render :json => config.to_json
  end
end
