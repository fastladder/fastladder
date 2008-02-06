class CreateSubscriptions < ActiveRecord::Migration
  def self.up
    create_table :subscriptions do |t|
      t.integer :member_id, :default => 0, :null => false
      t.integer :folder_id
      t.integer :feed_id, :default => 0, :null => false
      t.integer :rate, :default => 0, :null => false
      t.boolean :has_unread, :default => false, :null => false
      t.boolean :public, :default => true, :null => false
      t.boolean :ignore_notify, :default => false, :null => false
      t.datetime :viewed_on
      t.datetime :created_on, :null => false
      t.datetime :updated_on, :null => false
    end
    add_index :subscriptions, [:member_id, :feed_id], :unique => true
    add_index :subscriptions, :folder_id
    add_index :subscriptions, :feed_id
  end

  def self.down
    drop_table :subscriptions
  end
end
