require "test_helper"

class AboutControllerTest < ActionController::TestCase
  test "GET index with existing url assigns feed" do
    feed = FactoryBot.create(:feed)
    # faviconを作成してfeedに関連付け
    favicon = Favicon.create(feed: feed, image: "dummy")
    feed.update(favicon: favicon)

    Feed.stub :find_by, feed do
      get :index, params: { url: feed.link }
      assert_response :success
      assert_equal feed, assigns[:feed]
      assert_equal true, assigns[:is_feedlink]
    end
  end

  test "GET index with non-existing url returns 404" do
    get :index, params: { url: "http://example.com/unknown" }
    assert_equal 404, response.status
  end

  test "GET index shows ignore_body_update form when logged in" do
    member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
    feed = FactoryBot.create(:feed)
    favicon = Favicon.create(feed: feed, image: "dummy")
    feed.update(favicon: favicon)

    get :index, params: { url: feed.feedlink }, session: { member_id: member.id }
    assert_response :success
    assert_select "input#ignore_body_update[type=checkbox]"
  end

  test "POST update sets ignore_body_update" do
    member = FactoryBot.create(:member, password: "mala", password_confirmation: "mala")
    feed = FactoryBot.create(:feed)

    post :update, params: { url: feed.feedlink, ignore_body_update: "1" }, session: { member_id: member.id }
    assert_redirected_to about_path(url: feed.feedlink)
    assert feed.reload.ignore_body_update

    post :update, params: { url: feed.feedlink }, session: { member_id: member.id }
    assert_not feed.reload.ignore_body_update
  end

  test "POST update requires login" do
    feed = FactoryBot.create(:feed)

    post :update, params: { url: feed.feedlink, ignore_body_update: "1" }
    assert_redirected_to login_path
    assert_not feed.reload.ignore_body_update
  end
end
