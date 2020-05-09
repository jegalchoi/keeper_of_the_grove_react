class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.string :url, null: false
      t.string :public_id
      t.integer :plant_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :images, :plant_id
    add_index :images, :user_id
  end
end
