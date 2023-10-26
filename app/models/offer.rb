# frozen_string_literal: true

class Offer < ApplicationRecord
  validates :code, presence: true, uniqueness: true

  has_many :user_offers
  has_many :users, through: :user_offers
end
