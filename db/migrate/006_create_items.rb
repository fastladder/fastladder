class CreateItems < ActiveRecord::Migration
  def self.up
    create_table :items do |t|
      t.integer :feed_id, default: 0, null: false
      t.string :link, default: "", null: false
      t.text :title, null: false
      t.text :body
      t.string :author
      t.string :category
      t.string :enclosure
      t.string :enclosure_type
      t.string :digest
      t.integer :version, default: 1, null: false
      t.datetime :stored_on
      t.datetime :modified_on
      t.datetime :created_on, null: false
      t.datetime :updated_on, null: false
    end
    add_index :items, [:feed_id, :link], unique: true
  end

  def self.down
    drop_table :items
  end
end
