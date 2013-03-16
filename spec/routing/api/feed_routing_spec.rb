require 'spec_helper'

describe 'routing to api/feed' do
  %w(discover subscribed).each do|name|
    it "routes #{name}" do
      expect(get("/api/feed/#{name}")).to route_to("api/feed\##{name}")
    end
  end

  %w(subscribe unsubscribe update move set_rate set_notify set_public add_tags remove_tags).each do|name|
    it "routes #{name}" do
      expect(post("/api/feed/#{name}")).to route_to("api/feed\##{name}")
    end
  end
end
