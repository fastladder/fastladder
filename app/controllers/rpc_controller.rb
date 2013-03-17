class RpcController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_filter :auth
  def update_feed
    sub = @member.subscribe_feed params[:feedlink]
    if params[:json]
      params.merge! JSON.parse(params[:json]).symbolize_keys
    end
    item = Item.find_or_create_by_link_and_feed_id params[:link], sub.feed.id
    item.title = params[:title]
    item.body = params[:body]
    item.author = params[:author]
    item.category = params[:category]
    item.modified_on = params[:published_date]
    item.save
    render json: {result: true}
  end

  def check_digest
    digests = JSON.parse(params[:digests]).uniq.sort
    render json: (digests - Item.where(digests).map{|x| x.digest}.uniq.sort)
  end

  # TODO Fix Baaaaaad SQL
  def update_feeds
    JSON.parse(params[:feeds]).each{|x|
      x.symbolize_keys!
      sub = @member.subscribe_feed x[:feedlink]
      item = Item.find_or_create_by_link_and_feed_id x[:link], sub.feed.id
      item.title = x[:title]
      item.body = x[:body]
      item.author = x[:author]
      item.category = x[:category]
      item.modified_on = x[:published_date]
      item.save
    }
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
