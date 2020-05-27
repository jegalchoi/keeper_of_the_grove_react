# == Schema Information
#
# Table name: plants
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  notes      :text             not null
#  water      :datetime
#  hidden     :boolean          default("true"), not null
#  image      :string           default("https://placeimg.com/320/240/nature"), not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  image_id   :integer          default("-1"), not null
#
class Plant < ApplicationRecord
  validates :name, presence: true
  validates :notes, presence: true
  validates :hidden, presence: true
  validates :image, presence: true
  validates :image_id, presence: true
  validates :user_id, presence: true

  belongs_to :user
  has_many :images, dependent: :destroy
end
