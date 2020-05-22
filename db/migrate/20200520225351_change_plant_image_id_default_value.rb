class ChangePlantImageIdDefaultValue < ActiveRecord::Migration[6.0]
  def change
    change_column_default :plants, :image_id, ''
  end
end
