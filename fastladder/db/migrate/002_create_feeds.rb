class CreateFeeds < ActiveRecord::Migration
  def self.up
    create_table :feeds do |t|
      t.string :feedlink, :null => false
      t.string :link, :null => false
      t.text :title, :null => false
      t.text :description, :default => "", :null => false
      t.integer :subscribers_count, :default => 0, :null => false
      t.string :image
      t.string :icon
      t.datetime :modified_on
      t.datetime :created_on, :null => false
      t.datetime :updated_on, :null => false
    end
    add_index :feeds, :feedlink, :unique => true
  end

  def self.down
    drop_table :feeds
  end
end
