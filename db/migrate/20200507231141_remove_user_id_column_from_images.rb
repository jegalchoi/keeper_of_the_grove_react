class RemoveUserIdColumnFromImages < ActiveRecord::Migration[6.0]
  def change
    remove_column :images, :user_id
  end
end
