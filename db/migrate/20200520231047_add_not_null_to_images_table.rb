class AddNotNullToImagesTable < ActiveRecord::Migration[6.0]
  def change
    change_column_null :images, :public_id, false
    change_column_null :images, :user_id, false
    change_column_null :images, :plant_id, false
  end
end
