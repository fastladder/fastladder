class ImportController < ApplicationController
  before_action :login_required

  def index
  end

  def fetch
    @folders = Hash.new do |hash, key|
      hash[key] = []
    end
    @opml ||= begin
      if params[:opml].respond_to? :read
        opml = params[:opml].read.to_s
      elsif params[:url].present?
        opml = Fastladder.simple_fetch(url_from_path(:url))
      end
      Opml.new(opml)
    rescue
      nil
    end
    @opml.outlines.map(&:flatten).each do |outlines|
      folder_name = (first = outlines.first).outlines.present? ? first.attributes["title"] || first.attributes["text"] : ""
      @folders[folder_name] += outlines.select {|outline| outline.attributes["xml_url"].present? }.map do |outline|
        attributes = outline.attributes.dup
        feedlink = attributes["xml_url"]
        feed = Feed.find_by(feedlink: feedlink)
        item = {}
        item[:title] = attributes["title"] || attributes["text"] || feedlink
        item[:link] = attributes["url"] || attributes["html_url"] || feedlink
        item[:feedlink] = feedlink
        item[:subscribed] = feed.present? ? current_member.subscribed(feed) : false
        item
      end
    end if @opml.is_a? Opml
  end

  def finish
    titles = params[:titles]
    feedlinks = params[:feedlinks]
    check_for_subscribes = params[:check_for_subscribes]
    options = {quick: true}
    check_for_subscribes.select {|key, value| value == "1" }.keys.map do |i|
      title, feedlink = titles[i], feedlinks[i]
      folder_name, feedlink = feedlink.split(":", 2)
      folder = Folder.find_or_create_by(member_id: current_member.id, name: folder_name)
      @member.subscribe_feed(feedlink, options.merge(folder_id: folder.id, title: title))
    end
    redirect_to reader_path
  end
end
