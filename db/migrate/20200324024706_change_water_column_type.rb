class ChangeWaterColumnType < ActiveRecord::Migration[6.0]
  def change
    change_column :plants, :water, :date
  end
end
