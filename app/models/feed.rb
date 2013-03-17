# == Schema Information
#
# Table name: feeds
#
#  id                :integer          not null, primary key
#  feedlink          :string(255)      not null
#  link              :string(255)      not null
#  title             :text             default(""), not null
#  description       :text             default(""), not null
#  subscribers_count :integer          default(0), not null
#  image             :string(255)
#  icon              :string(255)
#  modified_on       :datetime
#  created_on        :datetime         not null
#  updated_on        :datetime         not null
#

#require "string_utils"
#require "fastladder/crawler"
require "open-uri"
require "tempfile"

class Feed < ActiveRecord::Base
  attr_accessible :feedlink, :link, :title, :description
  has_one :crawl_status
  has_one :favicon
  has_many :items
  has_many :subscriptions
  #has_many :members, :through => :subscriptions
  #has_many :folders, :through => :subscriptions

  def self.initialize_from_uri(uri)
    feed_dom = Feedzirra::Feed.parse(Fastladder::simple_fetch(uri))
    return nil unless feed_dom

    self.new(
      feedlink: uri.to_s,
      link: feed_dom.url || uri.to_s,
      title: feed_dom.title || feed_dom.url || "",
      description: feed_dom.description || "",
    )
  end

  def self.create_from_uri(uri)
    feed = self.initialize_from_uri(uri)
    return nil unless feed
    feed.save
    feed.create_crawl_status
    feed
  end
  
  def icon
    if self.favicon
      "/icon/#{self.id}"
    else
      "/img/icon/default.png"
    end
  end
  
  def to_json(options = {})
    result = {}
    %w(title description).each do |s|
      result[s.to_sym] = (self.send(s) || "").purify_html
    end
    %w(feedlink link image).each do |s|
      result[s.to_sym] = (self.send(s) || "").purify_uri
    end

    result[:expires] = 0
    result[:subscribers_count] = self.subscribers_count
    result[:error_count] = self.crawl_status.error_count
    result.to_json
  end

  def subscribed(member)
    member.subscribed(self)
  end

  def update_subscribers_count
    logger.warn "subscribers: #{self.subscribers_count}"
    self.update_attribute(:subscribers_count, self.subscriptions.size)
  end

  def crawl
    return if crawl_status.status != Fastladder::Crawler::CRAWL_OK
    crawl_status.update_attribute(:status, Fastladder::Crawler::CRAWL_NOW)
    begin
      crawler = Fastladder::Crawler.new(logger)
      crawler.crawl(self)
    rescue
      logger.error "Crawler error: #{$!}"
    ensure
      crawl_status.update_attribute(:status, Fastladder::Crawler::CRAWL_OK)
    end
  end

  def fetch_favicon!
    self.favicon ||= Favicon.new(:feed => self)
    favicon_list.each do |uri|
      next unless response = open(uri.to_s) rescue nil # ensure timeout
      next if response.status.last.to_i >= 400
      # MiniMagick will determine the image type from extension of file name
      ext = response.meta["content-type"] == 'image/vnd.microsoft.icon' ? ".ico" : File.basename(uri.to_s)
      tmp = Tempfile.new(["favicon", ext])
      tmp.binmode
      tmp.write response.read
      tmp.close
      buf = StringIO.new
      begin
        image = MiniMagick::Image.open(tmp.path)
        image.resize "16x16"
        image.format "png"
        image.write(buf)
        buf.rewind
        blob = buf.read.force_encoding('ascii-8bit')
        self.favicon.image = blob
        self.favicon.save
        break
      rescue MiniMagick::Invalid
        next
      ensure
        tmp.close!
      end
    end
  end

  def favicon_list
    xml = Fastladder.simple_fetch(feedlink)
    doc = Nokogiri::XML.parse(xml)
    uri_list = []

    doc.xpath("//link[@href and (@rel='shortcut icon' or @rel='icon')]/@href").each do |href|
      uri_list << Addressable::URI.join(feedlink, href.text).normalize
    end

    if uri_list.empty?
      doc = Nokogiri::HTML.parse(Fastladder.simple_fetch(link))
      doc.xpath('//link[@href and (@rel="shortcut icon" or @rel="icon")]/@href').each do |href|
        uri_list << Addressable::URI.join(link, href.text).normalize
      end
    end

    uri_list << Addressable::URI.join(feedlink, "/favicon.ico").normalize
    uri_list << Addressable::URI.join(link, "/favicon.ico").normalize
    uri_list.uniq
  end
end
