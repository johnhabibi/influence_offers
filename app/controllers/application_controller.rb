class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user

  def new
    @user = User.new
  end

  def current_user
    @current_user ||= session[:user_id] && User.find_by(id: session[:user_id])
  end
end
