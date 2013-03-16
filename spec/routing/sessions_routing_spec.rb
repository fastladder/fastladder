require 'spec_helper'

describe SessionsController do
  describe "routing" do
    it "routes to #new" do
      expect(get("/login")).to route_to("sessions#new")
    end

    it "routes to #create" do
      expect(post("/session")).to route_to("sessions#create")
    end

    it "routes to #destory" do
      expect(get("/logout")).to route_to("sessions#destroy")
    end
  end
end
