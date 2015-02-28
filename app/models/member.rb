# == Schema Information
#
# Table name: members
#
#  id                        :integer          not null, primary key
#  username                  :string(255)      not null
#  email                     :string(255)
#  crypted_password          :string(255)
#  salt                      :string(255)
#  remember_token            :string(255)
#  remember_token_expires_at :datetime
#  config_dump               :text
#  public                    :boolean          default(FALSE), not null
#  created_on                :datetime         not null
#  updated_on                :datetime         not null
#  auth_key                  :string(255)
#

require "digest/sha1"

class Member < ActiveRecord::Base
  # Virtual attribute for the unencrypted password
  attr_accessor :password
  serialize :config_dump

  has_many :folders
  has_many :subscriptions
  has_many :pins

  validates_presence_of :username
  validates_presence_of :password, if: :password_required?
  validates_presence_of :password_confirmation, if: :password_required?
  validates_length_of :password, within: 4..40, if: :password_required?
  validates_confirmation_of :password, if: :password_required?
  validates_length_of :username, within: 3..40
  validates_uniqueness_of :username, case_sensitive: false
  validates_uniqueness_of :auth_key, allow_nil: true
  before_save :encrypt_password

  # Authenticates a user by their login name and unencrypted password.  Returns the user or nil.
  def self.authenticate(username, password)
    u = find_by(username: username) # need to get the salt
    u && u.authenticated?(password) ? u : nil
  end

  # Encrypts some data with the salt.
  def self.encrypt(password, salt)
    Digest::SHA1.hexdigest("--#{salt}--#{password}--")
  end

  # Encrypts the password with the user salt
  def encrypt(password)
    self.class.encrypt(password, salt)
  end

  def authenticated?(password)
    crypted_password == encrypt(password)
  end

  def remember_token?
    remember_token_expires_at && Time.now.utc < remember_token_expires_at
  end

  # These create and unset the fields required for remembering users between browser closes
  def remember_me
    remember_me_for 2.weeks
  end

  def remember_me_for(time)
    remember_me_until time.from_now.utc
  end

  def remember_me_until(time)
    self.remember_token_expires_at = time
    self.remember_token            = encrypt("#{username}--#{remember_token_expires_at}")
    save(false)
  end

  def forget_me
    self.remember_token_expires_at = nil
    self.remember_token            = nil
    save(false)
  end

  def default_public
    unless self.public
      return false
    end
    config = self.config_dump and status = config["default_public_status"] and (status == true or status.to_i != 0)
  end

  def subscribe_feed(feedlink, options = {})
    if self.subscriptions.size >= Settings.subscribe_limit
      logger.warn "SUBSCRIBE LIMIT: #{self.username}(#{self.id}) #{feedlink}"
      return nil
    end

    unless feed = Feed.find_by(feedlink: feedlink)
      if options[:quick]
        feed = Feed.create({
          feedlink: feedlink,
          link: feedlink,
          title: options[:title],
          description: ""
        })
        feed.create_crawl_status
      else
        feed = Feed.create_from_uri(feedlink)
      end
    end

    options.delete(:quick)
    options.delete(:title)

    if sub = self.subscriptions.find_by(feed_id: feed.id)
      return sub
    end

    sub = self.subscriptions.create({
      feed_id: feed.id,
      has_unread: true,
    }.merge(options))
    sub
  end

  def subscribed(feed)
    self.subscriptions.find_by(feed_id: feed.id)
  end

  def check_subscribed(feedlink)
    if feed = Feed.find_by(feedlink: feedlink)
      return self.subscribed(feed)
    end
  end

  def total_subscribe_count
    self.subscriptions.size
  end

  def public_subscribe_count
    self.subscriptions.open.count
  end

  def public_subs
    self.subscriptions.open
  end

  def recent_subs(num)
    self.subscriptions.recent(num)
  end

  def set_auth_key
    self.auth_key = rand(256**16).to_s(16)
    self.save
  end

  # export OPML or JSON
  def export(format)
    case format
    when 'opml'
      folders = {}
      subs = subscriptions.includes(:folder).order("subscriptions.id")

      subs.each do |sub|
        feed = sub.feed
        item = {
          folder: (sub.folder ? sub.folder.name : "").utf8_roundtrip.html_escape,
          link: feed.link.html_escape,
          feedlink: feed.feedlink.html_escape,
          title: feed.title.utf8_roundtrip.html_escape,
        }
        folder_name = item[:folder]
        folders[folder_name] ||= []
        folders[folder_name] << item
      end

      opml = SimpleOPML.new
      folders.each do |key, items|
        outline = key === "" ? opml : (opml << SimpleOPML::Outline.new(text: key)).last
        items.each do |item|
          attributes = {
            title: item[:title],
            html_url: item[:link],
            text: item[:title],
            type: "rss",
            xml_url: item[:feedlink]
          }
          outline << SimpleOPML::Outline.new(attributes)
        end
      end
      return opml.to_xml
    when 'json'
      self.subscriptions.includes(feed: :favicon).map{|x| x.feed}.to_json
    end
  end

  protected

  # before filter
  def encrypt_password
    return if password.blank?
    self.salt = Digest::SHA1.hexdigest("--#{Time.now.to_s}--#{username}--") if new_record?
    self.crypted_password = encrypt(password)
  end

  def password_required?
    crypted_password.blank? || !password.blank?
  end
end
