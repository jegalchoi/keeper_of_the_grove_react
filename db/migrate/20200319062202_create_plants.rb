class CreatePlants < ActiveRecord::Migration[6.0]
  def change
    create_table :plants do |t|
      t.string :name, null: false
      t.text :notes
      t.datetime :water
      t.boolean :private, null: false, default: true
      t.string :image, default: 'https://placeimg.com/320/240/nature'
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :plants, :name
    add_index :plants, :user_id
  end
end
