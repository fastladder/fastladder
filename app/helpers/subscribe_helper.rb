module SubscribeHelper
  def is_checked(a, b)
    (a == b) ? " checked" : ""
  end

  def users_link(feed)
    if feed.subscribers_count > 0
      link_to(disp_users(feed.subscribers_count), about_path(url: feed.feedlink))
    else
      "(" + disp_users(feed.subscribers_count) + ")"
    end
  end

=begin
  def disp_users(num)
    return num.to_s + " " + (num > 1 ? "users" : "user")
  end
=end
end
