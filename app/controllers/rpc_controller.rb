class RpcController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def update_feed
    member = Member.where(auth_key: params[:api_key]).first
    render 'public/404', layout: false, status: 404 and return unless member
    sub = member.subscribe_feed params[:feedlink] 
    item = Item.find_or_create_by_link_and_feed_id params[:link], sub.feed.id
    item.title = params[:title]
    item.body = params[:body]
    item.author = params[:author]
    item.category = params[:category]
    item.modified_on = params[:published_date]
    item.save
    render json: {result: true}
  end
end
