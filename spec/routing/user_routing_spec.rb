require 'spec_helper'

describe 'routing to user' do
  it 'routes :login_name' do
    expect(get('/user/mala')).to route_to("controller" => "user",
                                          "action"     => "index",
                                          "login_name" => "mala")
  end
end

