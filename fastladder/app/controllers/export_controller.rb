require 'cgi'
require 'time'

class ExportController < ApplicationController
  verify :session => :member, :redirect_to => "/login"
  def opml
    folders = {}
    @opml = []
    @sites = []
    subs = member.subscriptions.find(:all, :order => "subscriptions.id", :include => :folder)

    subs.each do |sub|
      feed = sub.feed
      item = {
        :folder => (sub.folder ? sub.folder.name : "").utf8_roundtrip.html_escape,
        :link => feed.link.html_escape,
        :feedlink => feed.feedlink.html_escape,
        :title => feed.title.utf8_roundtrip.html_escape,
      }
      if folders[item[:folder]]
        folders[item[:folder]] << item
      else
        folders[item[:folder]] = [item]
      end
    end

    output = SimpleOPML.new
    folders.delete "" do |root|
      root.each do |item|
        output.add_item(item)
      end
    end
    folders.each do |key, value|
      output.add_outline(key, value)
    end
    render :xml => output.generate_opml
  end
end

class SimpleOPML
  def initialize
    @outline = []
  end

  def add_item(item)
    @outline << site_to_outline(item)
  end

  def add_outline(folder, items)
    str = %!<outline text="#{CGI.escapeHTML folder}">!
    str += items.map {|item| site_to_outline item }.join("")
    str += "</outline>"
    @outline << str
  end

  def generate_opml
    <<EOD
<?xml version="1.0" encoding="utf-8"?>
<opml version="1.0">
<head>
<title>Subscriptions</title>
<dateCreated>#{Time.now.rfc822}</dateCreated>
<ownerName />
</head>
<body>
#{@outline.join("")}
</body>
</opml>
EOD
  end

  def site_to_outline(site)
    %!<outline title="#{CGI.escapeHTML site[:title].toutf8}" htmlUrl="#{CGI.escapeHTML site[:link]}" text="#{CGI.escapeHTML site[:title].toutf8}" type="rss" xmlUrl="#{CGI.escapeHTML site[:feedlink]}" />\n!
  end
end
