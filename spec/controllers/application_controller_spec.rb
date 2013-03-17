require 'spec_helper'

describe ApplicationController do
  describe '.url_from_path' do
    it 'should extract URL from request-path' do
      request = double(:request)
      request.stub(:original_fullpath) { '/url/http://example.com' }
      controller.stub(:request) { request }

      controller.should_receive(:url_for).with(url: '.', only_path: true) { '/url/.' }

      controller.url_from_path(:url).should == 'http://example.com'
    end
  end
end
