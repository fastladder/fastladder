class CreateCrawlStatuses < ActiveRecord::Migration
  def self.up
    create_table :crawl_statuses do |t|
      t.integer :feed_id, :default => 0, :null => false
      t.integer :status, :default => 1, :null => false
      t.integer :error_count, :default => 0, :null => false
      t.string :error_message
      t.integer :http_status
      t.string :digest
      t.integer :update_frequency, :default => 0, :null => false
      t.datetime :crawled_on
      t.datetime :created_on, :null => false
      t.datetime :updated_on, :null => false
    end
    add_index :crawl_statuses, [:status, :crawled_on]
  end

  def self.down
    drop_table :crawl_statuses
  end
end
