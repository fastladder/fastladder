module AuthHelpers
  def login_as(member)
    visit "/login"
    fill_in 'username', with: member.username
    fill_in 'password', with: member.password
    click_on 'Sign In'
  end
end

RSpec.configuration.include AuthHelpers, type: :feature
