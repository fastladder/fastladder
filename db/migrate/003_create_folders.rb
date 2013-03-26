class CreateFolders < ActiveRecord::Migration
  def self.up
    create_table :folders do |t|
      t.integer :member_id, default: 0, null: false
      t.string :name, null: false
      t.datetime :created_on, null: false
      t.datetime :updated_on, null: false
    end
    add_index :folders, [:member_id, :name], unique: true
  end

  def self.down
    drop_table :folders
  end
end
