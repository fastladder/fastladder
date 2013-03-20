xml.instruct! :xml, :version => '1.0'
xml.rss :version => '2.0', 'xmlns:dc' => 'http://purl.org/dc/elements/1.1/' do
  xml.channel do
    xml.title "#{@target_member.username}'s subscriptions"
    xml.description "recent subscriptions of #{@target_member.username}"
    xml.link user_url(@target_member.username)
    for sub in @subscriptions
      feed = sub.feed
      xml.item do
        xml.title feed.title
        xml.description feed.description
        xml.pubDate feed.created_on.to_s(:rfc822)
        xml.dc :subject, sub.folder.name if sub.folder
        xml.link feed.link
      end
    end
  end
end
