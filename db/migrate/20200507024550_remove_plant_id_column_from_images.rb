class RemovePlantIdColumnFromImages < ActiveRecord::Migration[6.0]
  def change
    remove_column :images, :plant_id
  end
end
