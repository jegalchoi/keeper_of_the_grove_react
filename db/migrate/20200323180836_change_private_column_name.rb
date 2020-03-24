class ChangePrivateColumnName < ActiveRecord::Migration[6.0]
  def change
    rename_column :plants, :private, :hidden
  end
end
