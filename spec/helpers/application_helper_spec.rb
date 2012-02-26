require File.dirname(__FILE__) + '/../spec_helper'

describe ApplicationHelper do
  it 'should create script tag for file' do
    loadJS('sample').should be_eql("<script type=\"text/javascript\" src=\"/js/sample.js\" charset=\"utf-8\"></script>")
    loadJS('sample', 'test').should be_eql("<script type=\"text/javascript\" src=\"/js/sample.js\" charset=\"utf-8\"></script>\n<script type=\"text/javascript\" src=\"/js/test.js\" charset=\"utf-8\"></script>");
  end

  it 'should pluralize "user"' do
    disp_users(0).should be_eql('0 user')
    disp_users(1).should be_eql('1 user')
    disp_users(2).should be_eql('2 users')
  end
end
