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
require 'rails_helper'

RSpec.describe Image, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
