require 'spec_helper'

describe 'routing to api' do
  %w(all unread touch_all touch item_count unread_count folders crawl).each do|name|
    it "routes #{name}" do
      expect(get("/api/#{name}")).to route_to("api\##{name}")
    end
  end

  %w(subs lite_subs error_subs folders).each do|name|
    it "routes #{name}" do
      expect(post("/api/#{name}")).to route_to("api\##{name}")
    end
  end
end
