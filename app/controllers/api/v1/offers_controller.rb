# frozen_string_literal: true

class Api::V1::OffersController < ApplicationController
  def index
    birthdate = Date.parse(params[:birthdate])
    gender = params[:gender]

    puts "User's birthdate: #{birthdate}, Gender: #{gender}" # Add this line for debugging

    offers = Offer.where(
      'min_age <= ? AND max_age >= ? AND (gender = ? OR gender = \'all\')',
      calculate_age(birthdate),
      calculate_age(birthdate),
      gender
    )

    puts "Offers count: #{offers.count}" # Add this line for debugging

    render json: offers
  end



  private

  def calculate_age(birthdate)
    current_date = Date.today
    age = current_date.year - birthdate.year
    age -= 1 if (current_date.month < birthdate.month) || (current_date.month == birthdate.month && current_date.day < birthdate.day)
    age
  end
end
