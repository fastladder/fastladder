class RpcController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :auth
  def update_feed
    sub = @member.subscribe_feed params[:feedlink] 
    item = Item.find_or_create_by_link_and_feed_id params[:link], sub.feed.id
    item.title = params[:title]
    item.body = params[:body]
    item.author = params[:author]
    item.category = params[:category]
    item.modified_on = params[:published_date]
    item.save
    render json: {result: true}
  end

  def export
    case params[:format]
    when 'opml' 
      render xml: @member.export('opml')
    when 'json'
      render json: @member.export('json')
    else
      render 'public/404', layout: false, status: 404
    end
  end
  
  private
  def auth
    @member = Member.where(auth_key: params[:api_key]).first
    render 'public/404', layout: false, status: 404 and return unless @member
  end
end
