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
FactoryBot.define do
  factory :plant do
    name { Faker::Team.name }
    user_id { 1 }
  end
end
