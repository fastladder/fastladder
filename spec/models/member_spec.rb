require 'spec_helper'

describe Member do
  describe '.authenticate' do
    before { @member = Factory(:member, password: 'mala', password_confirmation: 'mala') }

    context 'password is correct' do
      it { expect(Member.authenticate('bulkneets', 'mala')).to be }
    end

    context 'password is incorrect' do
      it { expect(Member.authenticate('bulkneets', 'ssig33')).to be_false }
    end
  end
end
