# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
require 'faker'

100.times do |i|
  min_age = Faker::Number.between(from: 18, to: 99)

  Offer.create(
    description: Faker::Marketing.buzzwords,
    min_age: min_age,
    max_age: Faker::Number.between(from: min_age, to: 99),
    gender: Faker::Gender.binary_type
  )
end
