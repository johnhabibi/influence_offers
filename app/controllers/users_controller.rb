class UsersController < ApplicationController
  before_action :require_login, only: [:show_recommendations]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      log_in_user(@user)
      redirect_to show_recommendations_user_path(@user), notice: 'User created successfully'
    else
      flash.now[:alert] = 'User not created'
      render :new, status: :unprocessable_entity
    end
  end

  def show_recommendations
    @user = current_user
    @recommended_offers = @user.recommended_offers
  end

  private

  def user_params
    params.require(:user).permit(
      :username,
      :first_name,
      :last_name,
      :birthdate,
      :gender,
      :email,
      :password,
      :password_confirmation
    )
  end

  def require_login
    return if current_user

    flash[:alert] = 'Please log in to view recommended offers.'
    redirect_to new_user_session_path
  end

  def log_in_user(user)
    session[:user_id] = user.id
  end
end
