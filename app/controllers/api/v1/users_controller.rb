# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :verify_authenticity_token

      def new
        @user = User.new
      end

      def create
        @user = User.new(user_params)
        # Parse and format the birthdate
        @user.birthdate = Date.strptime(params[:birthdate], '%m/%d/%Y') if params[:birthdate].present?

        if @user.save
          render json: { message: 'User created successfully' }, status: :created
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def show
        @user = User.find(params[:id])
        render json: @user
      end

      def user_data
        # Fetch user data here and respond with it in JSON format
        user = current_user # You may need to customize this based on your authentication method
        if user
          render json: user, status: :ok
        else
          render json: { error: 'User not found' }, status: :not_found
        end
      end


      private

      def user_params
        params.permit(
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
    end
  end
end
