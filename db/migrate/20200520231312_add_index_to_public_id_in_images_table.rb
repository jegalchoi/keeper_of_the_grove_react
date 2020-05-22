class AddIndexToPublicIdInImagesTable < ActiveRecord::Migration[6.0]
  def change
    add_index :images, :public_id, unique: true
  end
end
