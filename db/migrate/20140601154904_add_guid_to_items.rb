class AddGuidToItems < ActiveRecord::Migration
  def up
    add_column :items, :guid, :string
    remove_index :items, [:feed_id, :link]
    Item.find_each do |item|
      item.guid ||= item.link
      item.save!
    end
    add_index :items, [:feed_id, :guid], unique: true
  end

  def down
    remove_index :items, [:feed_id, :guid]
    add_index :items, [:feed_id, :link], unique: true
    remove_column :items, :guid
  end
end
