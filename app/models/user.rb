# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  validates :username, :first_name, :last_name, :birthdate, :gender, :email, presence: true
  validates :username, :email, uniqueness: true

  has_and_belongs_to_many :offers

  def age
    if birthdate.present?
      today = Date.today
      birthdate = birthdate.to_date
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
end
