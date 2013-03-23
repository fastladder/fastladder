require 'spec_helper'

describe 'routing to api/feed' do
  %w(discover subscribed).each do|name|
    it "routes #{name} via GET" do
      expect(get("/api/feed/#{name}")).to route_to(controller: 'api/feed', action: name)
    end

    it "routes #{name} via POST" do
      expect(post("/api/feed/#{name}")).to route_to(controller: 'api/feed', action: name)
    end
  end

  %w(subscribe unsubscribe update move set_rate set_notify set_public add_tags remove_tags).each do|name|
    describe "/#{name}" do
      it "routes #{name}" do
        expect(post("/api/feed/#{name}")).to route_to(controller: 'api/feed', action: name)
      end

      it 'routes nothing' do
        expect(get("/api/feed/#{name}")).to route_to(controller: 'application', action: 'nothing', _: "feed/#{name}")
      end
    end
  end
end
