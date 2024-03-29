# frozen_string_literal: true

require 'application_system_test_case'

class LoginTest < ApplicationSystemTestCase
  test 'can create new member' do
    assert_equal 0, Member.count
    visit '/'
    assert_equal '/signup', current_path

    fill_in 'member[username]', with: 'dankogai'
    fill_in 'member[password]', with: 'kogaidan'
    fill_in 'member[password_confirmation]', with: 'kogaidan'

    click_on 'Sign Up'

    assert_equal '/reader/', current_path

    assert_equal 1, Member.count

    member = Member.first
    assert_equal 'dankogai', member.username

    assert_equal member.id, Member.authenticate('dankogai', 'kogaidan').id
  end

  test 'if member is existing, can login' do
    Member.create!(username: 'dankogai', password: 'kogaidan', password_confirmation: 'kogaidan')
    assert Member.authenticate('dankogai', 'kogaidan')

    visit '/'

    assert_equal '/login', current_path

    fill_in 'username', with: 'dankogai'
    fill_in 'password', with: 'kogaidan'

    click_on 'Sign In'

    assert_equal '/reader/', current_path
  end

end
