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
FactoryBot.define do
  factory :image do
    url { "MyString" }
    public_id { "MyString" }
    plant_id { 1 }
    user_id { 1 }
  end
end
