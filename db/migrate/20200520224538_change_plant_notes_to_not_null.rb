class ChangePlantNotesToNotNull < ActiveRecord::Migration[6.0]
  def change
    change_column_null :plants, :notes, false
  end
end
