class CreateFavicons < ActiveRecord::Migration[4.2]
  def self.up
    create_table :favicons do |t|
      t.integer :feed_id, default: 0, null: false
      t.binary :image
    end
    add_index :favicons, :feed_id, unique: true
  end

  def self.down
    drop_table :favicons
  end
end
