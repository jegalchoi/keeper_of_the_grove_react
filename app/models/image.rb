# == Schema Information
#
# Table name: images
#
#  id         :bigint           not null, primary key
#  url        :string           not null
#  public_id  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#  plant_id   :integer
#
class Image < ApplicationRecord
  validates :url, presence: true
  validates :public_id, presence: true
  validates :user_id, presence: true
  validates :plant_id, presence: true

  belongs_to :user
  belongs_to :plant
end
