class CreateStructure < ActiveRecord::Migration[6.0]
  def change
    create_table "images", force: :cascade do |t|
      t.string "url", null: false
      t.string "public_id", null: false
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.integer "user_id", null: false
      t.integer "plant_id", null: false
      t.index ["public_id"], name: "index_images_on_public_id", unique: true
    end

    create_table "plants", force: :cascade do |t|
      t.string "name", null: false
      t.text "notes", null: false
      t.datetime "water"
      t.boolean "hidden", default: true, null: false
      t.string "image", default: "https://placeimg.com/320/240/nature", null: false
      t.integer "user_id", null: false
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.integer "image_id", default: -1, null: false
      t.index ["name"], name: "index_plants_on_name"
      t.index ["user_id"], name: "index_plants_on_user_id"
    end

    create_table "users", force: :cascade do |t|
      t.string "username", null: false
      t.string "email", null: false
      t.string "password_digest", null: false
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.index ["email"], name: "index_users_on_email", unique: true
      t.index ["username"], name: "index_users_on_username", unique: true
    end
  end
end
