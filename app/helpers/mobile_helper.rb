module MobileHelper
  def remove_style_attr_of_all_tags(html)
    html && html.gsub(/<[^>]+>/) { |tag| tag.gsub(/style="[^"]+"/, '') }
  end
end
