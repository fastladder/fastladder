module SubscribeHelper
  def users_link(feed)
    if feed.subscribers_count > 0
      link_to(disp_users(feed.subscribers_count), about_path(url: feed.feedlink))
    else
      "(" + disp_users(feed.subscribers_count) + ")"
    end
  end
end
