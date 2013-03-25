class AddItemsIndex < ActiveRecord::Migration
  def self.up
    add_index :items, [:feed_id, :stored_on, :created_on, :id], name: :items_search_index
  end

  def self.down
    remove_index :items_search_index
  end
end
