class AddAuthKeyToMembers < ActiveRecord::Migration[4.2]
  def change
    add_column :members, :auth_key, :string
  end
end
