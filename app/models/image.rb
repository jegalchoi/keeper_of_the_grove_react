# == Schema Information
#
# Table name: images
#
#  id         :bigint           not null, primary key
#  url        :string           not null
#  public_id  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer          not null
#  plant_id   :integer          not null
#
class Image < ApplicationRecord
  validates :url, presence: true
  validates :public_id, presence: true
  validates :user_id, presence: true
  validates :plant_id, presence: true

  belongs_to :user
  belongs_to :plant
  
  before_destroy :delete_image_from_cloudinary

  private

    def delete_image_from_cloudinary
      @result = Cloudinary::Uploader.destroy(public_id)['result']
    end

end
