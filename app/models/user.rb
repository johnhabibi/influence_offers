# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  validates :username, :first_name, :last_name, :birthdate, :gender, :email, presence: true
  validates :username, :email, uniqueness: true

  has_many :user_offers
  has_many :offers, through: :user_offers, class_name: 'Offer'

  has_many :user_offer_relationships, class_name: 'UserOffer'
  has_many :accepted_offers, -> { where(user_offers: { accepted: true }) }, through: :user_offer_relationships, source: :offer
  has_many :rejected_offers, -> { where(user_offers: { rejected: true }) }, through: :user_offer_relationships, source: :offer

  def age
    if birthdate.present?
      today = Date.today
      age = today.year - birthdate.year
      age -= 1 if today < birthdate + age.years
      age
    else
      0
    end
  end

  def recommended_offers
    age = self.age
    gender = self.gender
    Offer.where('min_age <= ? AND max_age >= ? AND gender = ?', age, age, gender)
  end

  def birthdate_format
    errors.add(:birthdate, "is not a valid date") unless birthdate.is_a?(Date)
  end
end

