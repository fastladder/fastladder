require 'spec_helper'

describe SubscribeController do
  before do
    @member = Factory(:member, password: 'mala', password_confirmation: 'mala')
  end

  describe 'GET /confirm' do
    before do
      Rfeedfinder.stub(:feeds).and_return(['http://feeds.feedburner.com/mala/blog/'])
    end

    it 'renders confirm.html.erb' do
      get :confirm, { url: 'http://la.ma.la/blog/' }, { member_id: @member.id }
      expect(response).to render_template('confirm')
    end
  end
end
