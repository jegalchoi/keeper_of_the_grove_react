# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
FactoryBot.define do
  factory :user do
    username { Faker::Internet.user_name }
    email { Faker::Internet.email }
    password = 'password'

    factory :jay_test do
      username { "jay_test" }
      email { 'jay@email.com' }
      password { 'password' }
    end

    factory :cam_test do
      username { "cam_test" }
      email { 'cam@email.com' }
      password { 'password' }
    end
  end
end
