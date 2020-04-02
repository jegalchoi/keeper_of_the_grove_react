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