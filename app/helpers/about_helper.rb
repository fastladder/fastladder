module AboutHelper
  def users(num)
    pluralize(num, 'user')
  end

  def rate_image(num)
    image_tag "/img/rate/#{num}.gif", alt: num
  end
end
