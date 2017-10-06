module UserHelper
  def subscribe_button(feedlink)
    if current_member
      if (subs = current_member.check_subscribed(feedlink)).present?
        raw <<-EOS.strip_heredoc
          <span class="subscribed">[subscribed]</span>
          <button class="subs_edit" rel="edit:#{subs.id}">edit</button>
        EOS
      else
        link_to "add", subscribe_path(url: feedlink), class: "subscribe"
      end
    end
  end
end
