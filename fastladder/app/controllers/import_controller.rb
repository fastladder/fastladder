require "opml"
require "open-uri"
require "string_utils"

class ImportController < ApplicationController
  def index
     if request.post?
       @opml = Opml.new(params["opml"])
       return confirm
     end
  end

  def fetch
      opml_uri = params["url"]
#      begin
        str = open(opml_uri).read
        @opml = Opml.new(str)
        return self.confirm
#      rescue => e
        render :json => e
#      end
  end

  def finish
    unless request.post?
       return confirm
    end
    feed_hash = params[:feedlinks]
    title_hash = params[:titles]
    check_for_subscribe = params[:check_for_subscribe]
    feedlinks = feed_hash.keys.sort{|a,b| a.to_i <=> b.to_i }.map {|v| feed_hash[v]}
    titles = title_hash.keys.sort{|a,b| a.to_i <=> b.to_i }.map {|v| title_hash[v]}

    # return render :json => check_for_subscribe.to_json

    feedlinks.each_with_index do |feed, i|
      # return render :json => [check_for_subscribe, i, check_for_subscribe[i.to_s]].to_json
      logger.warn(i.to_s)
      next unless check_for_subscribe.has_key?(i.to_s)
      title = titles[i]
      (folder_name, feedlink) = feed.split(":", 2)
      # TODO: folder find or create
      folder = Folder.find_or_create_by_member_id_and_name(member.id, folder_name)
      options = {
        :folder_id => folder.id,
        :title  => title,
        :quick => true,
      }
      member.subscribe_feed(feedlink, options)
    end
    
    # render :json => feedlinks.to_json
    redirect_to :controller => "reader"
  end

  protected
  def confirm
    # return render :json => @opml.flatten.map{|o| o.inspect}.join("\n")
    @folders = {}
    @in_folder = {}
    opml = @opml.flatten
    
    folders = opml.select {|o|
      o.outlines.size > 0
    }.map {|o|
      folder_name = o.attributes["text"] || o.attributes["title"]
      o.outlines.each do |item|
        @in_folder[item.attributes["xml_url"]] = true
        @folders[folder_name] ||= []
        next unless item.attributes["xml_url"]
        feed = Feed.find_by_feedlink(item.attributes["xml_url"])
        if feed
          item.attributes["subscribed"] = member.subscribed(feed)
        end
        @folders[folder_name] << item.attributes
      end
      folder_name
    }
    # return render :json => @folders.to_json
    toplevel = opml.select {|o|
      o.outlines.size == 0 && o.attributes["xml_url"] && !@in_folder[o.attributes["xml_url"]]
    }.map {|item|
      feed = Feed.find_by_feedlink(item.attributes["xml_url"])
      if feed
        item.attributes["subscribed"] = member.subscribed(feed)
      end
      item.attributes["subscribed"] = member.subscribed(item.attributes["xml_url"])
      item.attributes
    }
    if toplevel.size > 0 
      @folders[""] = toplevel
    end
    
    @all_count = @folders.values.inject(0) {|a,b| a + b.size }
    @subscribed_count = 0
    @folders.values.each do |outline|
      c = outline.select{|item| item["subscribed"] }.size
      @subscribed_count += c
    end
    
    @not_subscribed_count = @all_count - @subscribed_count
    render :action => "confirm"
  end
end
