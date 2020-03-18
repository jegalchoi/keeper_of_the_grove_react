class UsersController < ApplicationController
  def index
    @users = User.all
    if @users
      render json: {
        users: @users
      }
    else
      render json: {
        status: 500,
        errors: ['Could not locate any users']
      }
    end
  end

  def show
    @user = selected_user
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
    @user = selected_user
    if @user && @user.update_attributes(user_params)
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
      render json: @user.errors.full_messages, status: 401
    end
  end

  def destroy
    @user = selected_user
    if @user
      @user.destroy
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

    def selected_user
      User.find(params[:id])
    end

end