# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def loadJS(*filename)
    filename.map {|str|
      javascript_include_tag str
    }.join("\n")
  end

  def disp_users(num)
    "#{num} #{(num > 1 ? "users" : "user")}"
  end
end
