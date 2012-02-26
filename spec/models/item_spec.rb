require File.dirname(__FILE__) + '/../spec_helper'

describe Item do
  fixtures :items

  before :each do
    @item = items(:fastladder_entry)
  end

  it 'should return json data' do
    json = @item.to_json
    json.should be_kind_of(String)
    json.should =~ /\{(\".+\": (\\")?[^,]+(\\")?(, )?)+\}/
  end
end
