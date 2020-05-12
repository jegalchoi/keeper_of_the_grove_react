class RemoveUserIdColumnToImages < ActiveRecord::Migration[6.0]
  def change
    remove_column :plants, :plant_id
  end
end
