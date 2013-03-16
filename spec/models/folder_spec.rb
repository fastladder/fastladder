# == Schema Information
#
# Table name: folders
#
#  id         :integer          not null, primary key
#  member_id  :integer          default(0), not null
#  name       :string(255)      not null
#  created_on :datetime         not null
#  updated_on :datetime         not null
#

require 'spec_helper'

describe Folder do
  describe 'mass-assignment error' do
    it 'not raises mass-assignment exception' do
      expect {
        Folder.create(name: 'Life Hack')
      }.to_not raise_error(ActiveModel::MassAssignmentSecurity::Error)
    end
  end
end
