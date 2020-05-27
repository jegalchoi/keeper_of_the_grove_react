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
class User < ApplicationRecord
  attr_reader :password
  has_secure_password

  validates :username, presence: true, uniqueness: true, length: { in: 6..50 }
  validates :email, presence: true, uniqueness: true, length: { maximum: 255 }
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :plants, dependent: :destroy
  has_many :images, dependent: :destroy
end
