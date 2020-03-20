# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  validates :username, presence: true, uniqueness: true, length: { maximum: 50 }
  validates :username, length: { minimum: 4 }
  validates :email, presence: true, uniqueness: true, length: { maximum: 255 }

  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  has_many :plants, dependent: :destroy
end
