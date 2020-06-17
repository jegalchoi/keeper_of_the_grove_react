# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(
    username: "camchoi",
    email: 'camchoi@gmail.com',
    password: '123456'
  )

99.times do |i|
  Plant.create(
    name: "Plant #{i + 1}",
    notes: "notes for plant #{i + 1}",
    user_id: User.find_by(username: 'camchoi').id,
    hidden: false
  )
end