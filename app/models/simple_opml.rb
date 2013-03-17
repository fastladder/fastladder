# -*- coding: utf-8 -*-

class SimpleOPML
  class Outline < ::SimpleOPML
    OUTLINE_ATTRIBUTE_KEYS = [:title, :html_url, :text, :type, :xml_url]

    def initialize(attributes = {})
      super()
      @attributes = attributes
    end

    class_eval do
      OUTLINE_ATTRIBUTE_KEYS.each do |name|
        define_method name do
          escape @attributes[name]
        end

        define_method "#{name}=" do |value|
          @attributes[name] = value
        end
      end
    end

    def attributes
      OUTLINE_ATTRIBUTE_KEYS.map do |key|
        value = send(key)
        value.nil? ? nil : " #{key.to_s.camelize(:lower)}=\"#{value}\""
      end.compact.join
    end

    def has_children?
      @outlines.length > 0
    end

    def to_xml
      out = "<outline#{attributes}#{"/" unless has_children?}>"
      if has_children?
        @outlines.each do |outline|
          out += outline.to_xml
        end
        out += "</outline>"
      end
      out
    end

    private

    def escape(string)
      CGI.escapeHTML string unless string.nil?
    end
  end

  def initialize
    @outlines = []
  end

  def <<(outline)
    outline = Outline.new(outline) unless outline.instance_of? Outline
    @outlines << outline
  end

  def to_xml
    <<EOD
<?xml version="1.0" encoding="utf-8"?>
<opml version="1.0">
<head>
<title>Subscriptions</title>
<dateCreated>#{Time.now.rfc822}</dateCreated>
<ownerName />
</head>
<body>
#{@outlines.map(&:to_xml).join("\n")}
</body>
</opml>
EOD
  end
end
