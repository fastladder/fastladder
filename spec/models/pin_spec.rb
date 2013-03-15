# -*- coding: utf-8 -*-
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
