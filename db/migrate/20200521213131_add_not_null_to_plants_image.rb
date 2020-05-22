class AddNotNullToPlantsImage < ActiveRecord::Migration[6.0]
  def change
    change_column_null :plants, :image, false
  end
end
