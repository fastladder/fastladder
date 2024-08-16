class ItemsMediumTextBody < ActiveRecord::Migration[7.2]
  def change
    # The default type for :text type is TEXT (65,535 bytes) on MySQL, which is sometimes not big enough.
    # ActiveRecord creates the column with MEDIUMTEXT when specify the longer limit than that threshold.
    # Other databases (SQLite, PostgreSQL) has longer limit so it shouldn't be a matter.
    # And the new limit below is also long enough for RSS item body.
    # Therefore it would not break the existing behavior for SQLite and PostgreSQL in a realistic scenario.
    change_column :items, :body, :text, limit: 16.megabytes - 1
  end
end
