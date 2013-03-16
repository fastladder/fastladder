class RpcController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def update_feed
    member = Member.where(auth_key: params[:api_key]).first
    render 'public/404', layout: false, status: 404 and return unless member
    sub = member.subscribe_feed params[:feedlink] 
    render json: {result: true}
  end
end
