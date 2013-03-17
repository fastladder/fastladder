class IconController < ApplicationController
  def get
    image = nil
    feed_id = url_from_path(:feed)
    feed = feed_id.match(/^\d+$/) ? Feed.find_by_id(feed_id.to_i) : Feed.find_by_feedlink(feed_id)
    if feed and feed.favicon
      image = feed.favicon.image
    else
      File.open(DEFAULT_FAVICON) do |f|
        image = f.binmode.read
      end
    end
    send_data image, :filename => "favicon", :type => "image/png", :disposition => "inline"
  end
end
