class UserSessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by(username: params[:username])

    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      flash[:notice] = 'Login successful'
      redirect_to root_path # Redirect to the root page
    else
      flash[:alert] = 'Login failed'
      redirect_to new_user_session_path
    end
  end

  def destroy
    session.delete(:user_id)
    redirect_to root_path, notice: 'You have been signed out'
  end

end
