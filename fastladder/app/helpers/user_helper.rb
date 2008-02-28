module UserHelper
  def format_opml_item(item)
    feed = item.feed
    %Q{<outline title="#{feed.title.html_escape}" htmlUrl="#{feed.link.html_escape}" type="rss" xmlUrl="#{feed.feedlink.html_escape}" />}
  end

  def subscribe_button(feedlink)
    unless @member
      return '<a href="/subscribe/#{ feedlink }" class="subscribe">add</a>'
    end
    subs = @member.check_subscribed(feedlink)
    if subs
      return <<END
<span class="subscribed">[subscribed]</span>
<button class="subs_edit" rel="edit:#{subs.id}" onkeydown="subs_edit.call(this,event)" onmousedown="subs_edit.call(this,event)" onclick="return false">edit</button>
END
    end
  end

=begin
  def disp_users(num)
    return num.to_s + " " + (num > 1 ? "users" : "user")
  end
=end
end
