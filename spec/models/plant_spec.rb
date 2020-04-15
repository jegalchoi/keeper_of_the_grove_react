require 'rails_helper'

RSpec.describe Plant, type: :model do
  subject(:plant) { build(:plant) }

  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:user_id) }
  end

  describe "associations" do
    it { should belong_to(:user) }
  end
end