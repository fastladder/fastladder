require 'spec_helper'

describe SubscribeController do
  before do
    @member = Factory(:member, password: 'mala', password_confirmation: 'mala')
  end

  describe 'GET /confirm' do
    context 'feed exists' do
      before do
        Rfeedfinder.stub(:feeds).and_return(['http://feeds.feedburner.com/mala/blog/'])
      end

      it 'renders confirm.html.erb' do
        get :confirm, { url: 'http://la.ma.la/blog/' }, { member_id: @member.id }
        expect(response).to render_template('confirm')
      end

      it 'assigns @feeds' do
        get :confirm, { url: 'http://la.ma.la/blog/' }, { member_id: @member.id }
        expect(assigns(:feeds)).to be_a_kind_of(Array)
      end
    end

    context 'no feeds' do
      before do
        Rfeedfinder.stub(:feeds).and_return([])
      end

      it 'redirect to index' do
        get :confirm, { url: 'http://localhost/' }, { member_id: @member.id }
        expect(response).to redirect_to('/subscribe')
      end

      it 'shows flash notice' do
        get :confirm, { url: 'http://localhost/' }, { member_id: @member.id }
        expect(flash[:notice]).to eq("please check URL")
      end
    end
  end
end
