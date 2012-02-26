module AboutHelper
  def users(num)
    pluralize(num, 'user')
  end
  def rate_image(num)
    %Q{<img src="/img/rate/#{num}.gif" />}
  end
end
