FactoryBot.define do
  factory :plant do
    name { Faker::Team.name }
    user_id { 6 }
  end
end