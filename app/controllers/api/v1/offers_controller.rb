# frozen_string_literal: true

class Api::V1::OffersController < ApplicationController
  def index
    user = User.find(params[:user_id])

    puts "User birthdate: #{user.birthdate}"

    suggestions = Offer
                  .where('min_age <= ? AND max_age >= ? AND (gender = ? OR gender = \'all\')', user.age, user.age, user.gender)
                  .joins('LEFT JOIN user_offers ON offers.id = user_offers.offer_id AND user_offers.accepted IS NULL AND user_offers.rejected IS NULL')
                  .where('user_offers.offer_id IS NULL')
                  .where('user_offers.rejected IS NULL')

    if params[:user_id]
      user = User.find(params[:user_id])
      accepted_offer_ids = user.accepted_offers.pluck(:id)
      rejected_offer_ids = user.rejected_offers.pluck(:id)
      suggestions = suggestions.where.not(id: accepted_offer_ids + rejected_offer_ids)
    end

    render json: suggestions
  end

  private

  def calculate_age(birthdate)
    current_date = Date.today
    age = current_date.year - birthdate.year
    age -= 1 if (current_date.month < birthdate.month) || (current_date.month == birthdate.month && current_date.day < birthdate.day)
    age
  end
end
