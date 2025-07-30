require "test_helper"

class ImportControllerTest < ActionController::TestCase
  def setup
    @member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
  end

  test "POST fetch calls simple_fetch" do
    Fastladder.stub :simple_fetch, "<opml/>" do
      post :fetch, params: { url: "http://example.com" }, session: { member_id: @member.id }
      assert_response :success
    end
  end

  test "POST fetch assigns folder" do
    opml_content = File.read(Rails.root.join("test/stubs/opml"))
    Fastladder.stub :simple_fetch, opml_content do
      post :fetch, params: { url: "http://example.com" }, session: { member_id: @member.id }
      assert_includes assigns[:folders].keys, "Subscriptions"
    end
  end

  test "POST fetch assigns item" do
    opml_content = File.read(Rails.root.join("test/stubs/opml"))
    Fastladder.stub :simple_fetch, opml_content do
      post :fetch, params: { url: "http://example.com" }, session: { member_id: @member.id }
      item = assigns[:folders]["Subscriptions"][0]
      assert_equal "Recent Commits to fastladder:master", item[:title]
      assert_equal "https://github.com/fastladder/fastladder/commits/master", item[:link]
      assert_equal "https://github.com/fastladder/fastladder/commits/master.atom", item[:feedlink]
      assert_equal false, item[:subscribed]
    end
  end
end
