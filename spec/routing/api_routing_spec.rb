require 'spec_helper'

describe 'routing to api' do
  %w(all unread touch_all touch item_count unread_count crawl).each do|name|
    it "routes #{name} via POST" do
      expect(get("/api/#{name}")).to route_to(controller: 'api', action: name)
    end

    it "routes #{name} via POST" do
      expect(post("/api/#{name}")).to route_to(controller: 'api', action: name)
    end
  end

  %w(subs lite_subs error_subs folders).each do|name|
    it "routes #{name}" do
      expect(post("/api/#{name}")).to route_to(controller: 'api', action: name)
    end

    it 'routes nothing' do
      expect(get("/api/#{name}")).to route_to('application#nothing', _: name)
    end
  end
end
