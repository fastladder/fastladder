class AddIndexToDigestOnItems < ActiveRecord::Migration
  def change
    add_index :items, :digest
  end
end
