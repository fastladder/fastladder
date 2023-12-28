class AddIndexToDigestOnItems < ActiveRecord::Migration[4.2]
  def change
    add_index :items, :digest
  end
end
