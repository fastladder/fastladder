# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def loadJS(*filename)
    filename.map {|str|
      %Q{<script type="text/javascript" src="/js/#{str}.js" charset="utf-8"></script>}
    }.join("\n")
  end

  def disp_users(num)
    "#{num} #{(num > 1 ? "users" : "user")}"
  end
end
