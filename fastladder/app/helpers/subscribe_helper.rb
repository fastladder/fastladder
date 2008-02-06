module SubscribeHelper
  def is_checked(a, b)
    (a == b) ? " checked" : ""
  end

  def users_link(feed)
    if feed.subscribers_count > 0 
      %Q!(<a href="/about/#{feed.feedlink.html_escape}">#{disp_users(feed.subscribers_count)}</a>)!
    else
      "(" + disp_users(feed.subscribers_count) + ")"
    end
  end
  
  def disp_users(num)
    num.to_s + " " + (num > 1 ? "users" : "user")
  end
end
