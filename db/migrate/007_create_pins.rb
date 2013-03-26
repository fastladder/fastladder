class CreatePins < ActiveRecord::Migration
  def self.up
    create_table :pins do |t|
      t.integer :member_id, default: 0, null: false
      t.string :link, default: "", null: false
      t.string :title
      t.datetime :created_on, null: false
      t.datetime :updated_on, null: false
    end
    add_index :pins, [:member_id, :link], unique: true
  end

  def self.down
    drop_table :pins
  end
end
