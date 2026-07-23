class AddIgnoreBodyUpdateToFeeds < ActiveRecord::Migration[8.1]
  def change
    add_column :feeds, :ignore_body_update, :boolean, default: false, null: false
  end
end
