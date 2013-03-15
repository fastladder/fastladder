require 'spec_helper'

describe CrawlStatus do
  describe 'mass-assignment error' do
    before { @crawl_status = Factory(:crawl_status) }

    it 'not raises mass-assignment exception' do
      expect {
        @crawl_status.update_attributes(status: Fastladder::Crawler::CRAWL_NOW)
      }.to_not raise_error(ActiveModel::MassAssignmentSecurity::Error)
    end

    it 'not raises mass-assignment exception' do
      expect {
        @crawl_status.update_attributes(crawled_on: Time.now)
      }.to_not raise_error(ActiveModel::MassAssignmentSecurity::Error)
    end
  end
end
