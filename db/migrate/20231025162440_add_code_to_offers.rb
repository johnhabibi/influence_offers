class AddCodeToOffers < ActiveRecord::Migration[7.1]
  def change
    add_column :offers, :code, :string
  end
end
