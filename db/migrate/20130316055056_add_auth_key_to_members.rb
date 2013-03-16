class AddAuthKeyToMembers < ActiveRecord::Migration
  def change
    add_column :members, :auth_key, :string
  end
end
