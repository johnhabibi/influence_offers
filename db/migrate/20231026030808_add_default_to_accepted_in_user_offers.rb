class AddDefaultToAcceptedInUserOffers < ActiveRecord::Migration[7.1]
  def change
    change_column :user_offers, :accepted, :boolean, default: false
  end
end
