class Api::V1::SessionsController < ApplicationController
  def create
    @user = User.find_by(username: session_params[:username])

    if @user && @user.authenticate(session_params[:password])
      login!
      render json: {
        logged_in: true,
        user: @user
      }
    else
      render json: {
        status: 401,
        errors: ['Could not locate user', 'Verify credentials and try again or sign up']
      }
    end
  end

  def is_logged_in?
    if logged_in? && current_user
      render json: {
        logged_in: true,
        user: current_user
      }
    else
      render json: {
        logged_in: false,
        message: 'Could not locate user'
      }
    end
  end

  def destroy
    logout!
    render json: {
      status: 200,
      logged_in: false
    }
  end

  private

  def session_params
    params.require(:user).permit(:username, :password)
  end

end