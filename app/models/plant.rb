# == Schema Information
#
# Table name: plants
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  notes      :text
#  water      :datetime
#  private    :boolean          default("true"), not null
#  image      :string           default("https://placeimg.com/320/240/nature")
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Plant < ApplicationRecord
  # include ActionView::Helpers::DateHelper

  validates :name, presence: true
  validates :user_id, presence: true
  # validate :image_type

  belongs_to :user

  default_scope { order(created_at: :desc) }

  def last_watered
    if water
      time_ago_in_words(water)
    end
  end

#   has_many_attached :images
#   scope :with_eager_loaded_images, -> { eager_load(images_attachments: :blob) }

#   private
  
#   def image_type
#     if images.attached?
#       images.each do |image|
#         if !image.content_type.in?(%('image/jpg image/jpeg image/gif image/png'))
#           errors.add(:images, "needs to be a jpg, jpeg, gif or png!")
#         end
#       end
#     end
#   end

end
