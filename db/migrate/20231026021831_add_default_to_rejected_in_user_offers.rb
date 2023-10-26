class AddDefaultToRejectedInUserOffers < ActiveRecord::Migration[6.0]
  def change
    change_column :user_offers, :rejected, :boolean, default: false
  end
end
