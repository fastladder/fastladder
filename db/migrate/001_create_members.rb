class CreateMembers < ActiveRecord::Migration
  def self.up
    create_table :members do |t|
      t.string :username, null: false
      t.string :email
      t.string :crypted_password
      t.string :salt
      t.string :remember_token
      t.datetime :remember_token_expires_at
      t.text :config_dump
      t.boolean :public, default: false, null: false
      t.datetime :created_on, null: false
      t.datetime :updated_on, null: false
    end
    add_index :members, :username, unique: true
  end

  def self.down
    drop_table :members
  end
end
