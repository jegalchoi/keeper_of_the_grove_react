class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  # def index
  #   @users = User.all
  #   if @users
  #     render json: {
  #       users: @users
  #     }
  #   else
  #     render json: {
  #       status: 500,
  #       errors: ['Could not locate any users']
  #     }
  #   end
  # end

  def show
    if @user
      render json: {
        user: @user
      }
    else
      render json: {
        status: 500,
        errors: ['Could not locate user']
      }
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!
      render json: {
        status: :created,
        user: @user
      }
    else
      render json: {
        status: 500,
        errors: @user.errors.full_messages
      }
    end
  end

  def update
    if @user && @user.update(user_params)
      render json: {
        status: :updated,
        user: @user
      }
    elsif !@user
      render json: {
        status: 400,
        errors: ['Could not locate user'] 
      }
    else
      render json: {
        status: 401,
        errors: @user.errors.full_messages
      }
    end
  end

  def destroy
    if @user
      @user.destroy
      logout!
      render json: {
        status: :destroyed
      }
    else
      render json: {
        status: 500,
        errors: ['Could not locate user']
      }
    end
  end

    private

    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end

    def set_user
      @user ||= User.find_by(id: params[:id])
    end

end