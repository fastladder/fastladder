require "string_utils"
require "rss"


class UserController < ApplicationController
  def index
    @target = Member.find_by_username(params[:login_name])
  end

  def rss
    @target = Member.find_by_username(params[:login_name])
    name = @target.username
    rss = RSS::Maker.make("2.0") do |maker|
      maker.channel.about = url_for(:controller=>"user", :login_name => name, :action=>"rss")
      maker.channel.title = "#{name}'s subscription"
      maker.channel.description = "recent subscription of #{name}"
      maker.channel.link = url_for(:controller=>"user", :login_name => name, :action => "index")
      # maker.channel.language = "ja"
      
      maker.items.do_sort = true
      maker.items.max_size = 30
      
      # itemの設定
      @target.subscriptions.find(:all, :conditions => ["public = ?", true], :order => "created_on DESC", :limit => 30).each do |sub|
        item = maker.items.new_item
        feed = sub.feed
        item.title = feed.title
        item.link = feed.link
        item.dc_subject = sub.folder.name if sub.folder
        item.description = feed.description
        item.date = sub.created_on
      end
    end
    @headers["Content-Type"] = 'application/xml; charset=UTF-8'
    render :text => rss.to_s, :layout => false
#     render :xml => rss_data
  end

  def opml
    @target = Member.find_by_username(params[:login_name])
    opml_data = render_to_string :file => "app/views/user/opml.xml"
    render :xml => opml_data
    # send_data opml_data, :filename => "#{login_name}.opml", :type => "text/xml", :disposition => "inline"
  end
end
