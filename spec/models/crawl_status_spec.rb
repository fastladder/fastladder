# == Schema Information
#
# Table name: crawl_statuses
#
#  id               :integer          not null, primary key
#  feed_id          :integer          default(0), not null
#  status           :integer          default(1), not null
#  error_count      :integer          default(0), not null
#  error_message    :string(255)
#  http_status      :integer
#  digest           :string(255)
#  update_frequency :integer          default(0), not null
#  crawled_on       :datetime
#  created_on       :datetime         not null
#  updated_on       :datetime         not null
#

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
