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
        user = current_user
        if user
          render json: user, status: :ok
        else
          render json: { error: 'User not found' }, status: :not_found
        end
      end

      def accept_offer
        user = current_user
        offer = Offer.find(params[:offer_id])

        user_offer = UserOffer.create(user: user, offer: offer, accepted: true)

        if user_offer.persisted?
          render json: { message: 'Offer accepted successfully' }
        else
          render json: { message: 'Failed to accept the offer' }, status: :unprocessable_entity
        end
      end

      def reject_offer
        user = current_user
        offer = Offer.find(params[:offer_id])

        user_offer = UserOffer.create(user: user, offer: offer, rejected: true)

        if user_offer.persisted?
          render json: { message: 'Offer rejected successfully' }
        else
          render json: { message: 'Failed to reject the offer' }, status: :unprocessable_entity
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
