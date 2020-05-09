# == Schema Information
#
# Table name: plants
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  notes      :text
#  water      :datetime
#  hidden     :boolean          default("true"), not null
#  image      :string           default("https://placeimg.com/320/240/nature")
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  image_id   :integer
#
class Plant < ApplicationRecord

  validates :name, presence: true
  validates :user_id, presence: true

  belongs_to :user

  default_scope { order(created_at: :desc) }
end
