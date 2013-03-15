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
