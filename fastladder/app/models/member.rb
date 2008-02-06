require "digest/sha1"
require "yaml"
require "open-uri"
require "feed-normalizer"
require "crawler"

class Member < ActiveRecord::Base
  # Virtual attribute for the unencrypted password
  attr_accessor :password
  serialize :config_dump

  has_many :folders
  has_many :subscriptions
  has_many :pins

  validates_presence_of :username
  validates_presence_of :password, :if => :password_required?
  validates_presence_of :password_confirmation, :if => :password_required?
  validates_length_of :password, :within => 4..40, :if => :password_required?
  validates_confirmation_of :password, :if => :password_required?
  validates_length_of :username, :within => 3..40
  validates_uniqueness_of :username, :case_sensitive => false
  before_save :encrypt_password
  
  # prevents a user from submitting a crafted form that bypasses activation
  # anything else you want your user to change should be added here.
  attr_accessible :username, :password, :password_confirmation
  
  # Authenticates a user by their login name and unencrypted password.  Returns the user or nil.
  def self.authenticate(username, password)
    u = find_by_username(username) # need to get the salt
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
    if self.subscriptions.size >= SUBSCRIBE_LIMIT
      logger.warn "SUBSCRIBE LIMIT: #{self.username}(#{self.id}) #{feedlink}"
      return nil
    end
    
    if feed = Feed.find_by_feedlink(feedlink)

    elsif options[:quick]
      feed_data = {}
      feed = Feed.create({
         :feedlink => feedlink,
         :link => feedlink,
         :title => options[:title],
         :description => ""
      })
      feed.create_crawl_status
    else
      unless feed_data = FeedNormalizer::FeedNormalizer.parse(Crawler::simple_fetch(feedlink))
        return nil
      end
      feed = Feed.create({
        :feedlink => feedlink,
        :link => feed_data.urls[0] || feedlink,
        :title => feed_data.title || feed_data.link || "",
        :description => feed_data.description || "",
      })
      feed.create_crawl_status
    end

    options.delete(:quick)
    options.delete(:title)

    if sub = self.subscriptions.find_by_feed_id(feed.id)
      return sub
    end

    sub = self.subscriptions.create({
      :feed_id => feed.id,
      :has_unread => true,
    }.merge(options))
    sub
  end

  def subscribed(feed)
    self.subscriptions.find_by_feed_id(feed.id)
  end

  def check_subscribed(feedlink)
    if feed = Feed.find_by_feedlink(feedlink)
      return self.subscribed(feed)
    end
  end

  def total_subscribe_count
    self.subscriptions.size
  end

  def public_subscribe_count
    self.subscriptions.count(:conditions => ["public = ?", true])
  end

  def public_subs
    self.subscriptions.find(:all, :conditions => ["public = ?", true])
  end

  def recent_subs(num)
    self.subscriptions.find(:all, :order => "created_on DESC", :limit => num)
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
