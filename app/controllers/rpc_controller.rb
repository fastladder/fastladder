class RpcController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :auth
  def update_feed
    options = params.dup
    if options[:json]
      options.merge! JSON.parse(options[:json]).symbolize_keys
    end
    create_item options, @member
    render json: {result: true}
  end

  def check_digest
    digests = JSON.parse(params[:digests]).uniq.sort
    render json: (digests - Item.where(digests).map{|x| x.digest}.uniq.sort)
  end

  # TODO Fix Baaaaaad SQL
  def update_feeds
    JSON.parse(params[:feeds]).each{|options|
      options.symbolize_keys!
      create_item options, @member
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

  def create_item(options, member)
    if options[:feedtitle]
      feed = Feed.where(feedlink: options[:feedlink]).first
      unless feed
        description = options[:feeddescription] ? options[:feeddescription] : options[:feedtitle]
        feed = Feed.create(feedlink: options[:feedlink], title: options[:feedtitle], link: options[:feedlink], description: description)
      end
      sub = member.subscriptions.where(feed_id: feed.id).first
      unless sub
        sub = member.subscriptions.create(feed_id: feed.id, has_unread: true)
      end
    else
      sub = member.subscribe_feed options[:feedlink]
    end
    item =
      if options[:guid]
        Item.find_or_create_by(guid: options[:guid], feed_id: sub.feed.id) do |item|
          item.link = options[:link]
        end
      else
        Item.find_or_create_by(link: options[:link], feed_id: sub.feed.id) do |item|
          item.guid = item.link
        end
      end
    sub.update!(has_unread: true)
    item.title = options[:title]
    item.body = options[:body]
    item.author = options[:author]
    item.category = options[:category]
    item.modified_on = options[:published_date]
    item.save
  end
end
