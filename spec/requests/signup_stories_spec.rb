require 'spec_helper'

describe "SignupStories" do
  describe "GET /signup_stories" do
    it "works! (now write some real specs)" do
      # Run the generator again with the --webrat flag if you want to use webrat methods/matchers
      get signup_stories_index_path
      response.status.should be(200)
    end
  end
end
