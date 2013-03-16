# -*- coding: utf-8 -*-
# == Schema Information
#
# Table name: pins
#
#  id         :integer          not null, primary key
#  member_id  :integer          default(0), not null
#  link       :string(255)      default(""), not null
#  title      :string(255)
#  created_on :datetime         not null
#  updated_on :datetime         not null
#

require 'spec_helper'

describe Pin do
  describe 'mass-assignment error' do
    it 'not raises mass-assignment exception' do
      expect {
        Pin.create(link: 'http://la.ma.la/blog/diary_200810292006.htm')
      }.to_not raise_error(ActiveModel::MassAssignmentSecurity::Error)
    end

    it 'not raises mass-assignment exception' do
      expect {
        Pin.create(title: '近況')
      }.to_not raise_error(ActiveModel::MassAssignmentSecurity::Error)
    end
  end
end
