module ApplicationHelper
  def disp_users(num)
    "#{num} #{(num > 1 ? "users" : "user")}"
  end
end
