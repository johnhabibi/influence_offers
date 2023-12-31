class Api::V1::UserOffersController < ApplicationController
  before_action :authenticate_user

  def accepted_offers
    user = current_user
    accepted_offers = user.accepted_offers
    render json: accepted_offers
  end

  def rejected_offers
    user = current_user
    rejected_offers = user.rejected_offers
    render json: rejected_offers
  end

  private

  def authenticate_user
    unless current_user
      redirect_to root_path, alert: 'You must be logged in to perform this action'
    end
  end
end
