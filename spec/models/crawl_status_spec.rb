require File.dirname(__FILE__) + '/../spec_helper'

describe CrawlStatus do
  before(:each) do
    @crawl_status = CrawlStatus.new
  end

  it "should be valid" do
    @crawl_status.should be_valid
  end
end
