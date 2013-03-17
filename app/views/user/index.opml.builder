xml.instruct! :xml, :version => '1.0' 
xml.opml :version => '1.0' do
  xml.head do
    xml.title "#{@username}'s subscriptions"
    xml.ownerName @username
  end
  xml.body do
    xml.outline title: 'Subscritions' do
      xml.outline title: @username do
        @target.public_subs.map do |sub|
          feed = sub.feed
          xml.outline nil, title: feed.title, htmlUrl: feed.link, xmlUrl: feed.link
        end
      end
    end
  end
end
