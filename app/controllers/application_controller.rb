class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  helper_method :login!, :logged_in?, :logout!, :current_user, :authorized_user?, :current_user_id, :current_user_username

  def login!
    session[:user_id] = @user.id
  end

  def logged_in?
    !!session[:user_id]
  end

  def logout!
    session.clear
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def authorized_user?
    @user == current_user
  end

  def current_user_id
    current_user ? current_user.id : nil
  end

  def current_user_username
    current_user ? current_user.username : nil
  end

end
