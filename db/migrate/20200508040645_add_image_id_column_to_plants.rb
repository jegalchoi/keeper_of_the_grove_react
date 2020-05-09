class AddImageIdColumnToPlants < ActiveRecord::Migration[6.0]
  def change
    add_column :plants, :image_id, :integer
  end
end
