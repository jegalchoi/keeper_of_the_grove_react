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
require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) do
    User.create!(
      username: "camchoi",
      email: "test@email.com",
      password: "password"
    )
  end

  it { should validate_presence_of(:username) }
  it { should validate_uniqueness_of(:username) }
  it { should validate_length_of(:username).is_at_least(6) }
  it { should validate_length_of(:username).is_at_most(50) }
  
  it { should validate_presence_of(:email) }
  it { should validate_length_of(:email).is_at_most(255) }
  invalid_addresses = %w[user@example,com user_at_foo.org user.name@example. foo@bar_baz.com foo@bar+baz.com]
  invalid_addresses.each do |address|
    it { should_not allow_value(address).for(:email) }
  end

  it "creates a password digest when a password is given" do
    expect(user.password_digest).to_not be_nil
  end

  describe "associations" do
    it { should have_many(:plants) }
    it { should have_many(:images) }
  end

  describe "password encryption" do
    it "does not save passwords to the database" do
      create(:user, username: 'camchoi', password: 'password')
      user = User.find_by(username: 'camchoi')
      expect(user.password).not_to be ('password')
    end

    it "encrypts the password using BCrypt" do
      expect(BCrypt::Password).to receive(:create)
      User.new(username: 'jaychoi', password: 'password')
    end
  end

  describe "class methods" do
    subject(:user) do
      User.create!(
        username: "camchoi",
        email: "test@email.com",
        password: "password"
      )
    end

    describe "#authenticated?" do
      it "should confirm password is correct" do
        user.password = 'password'
        password = user.password
        check_password = user.authenticate(password)
        expect(check_password).to eq(user)
      end

      it "should confirm password is incorrect" do
        password = 'pass'
        check_password = user.authenticate(password)
        expect(check_password).to eq(false)
      end
    end

    describe "#password=" do
      it "should set password_digest" do
        user.password_digest = nil
        user.password = 'new_password'
        password = user.password
        expect(user.password_digest).to_not be_nil
      end
    end
  end
end
