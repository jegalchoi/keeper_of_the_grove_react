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
require 'rails_helper'

RSpec.describe Plant, type: :model do
  subject(:plant) { build(:plant) }

  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:image) }
    it { should validate_presence_of(:image_id) }
    it { should validate_presence_of(:user_id) }
  end

  describe "associations" do
    it { should belong_to(:user) }
    it { should have_many(:images) }
  end
end
