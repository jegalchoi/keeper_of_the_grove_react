class ChangePlantImageIdToNotNull < ActiveRecord::Migration[6.0]
  def change
    change_column_null :plants, :image_id, false
  end
end
