class CreateUserOffers < ActiveRecord::Migration[7.1]
  def change
    create_table :user_offers do |t|
      t.references :user, null: false, foreign_key: true
      t.references :offer, null: false, foreign_key: true
      t.boolean :accepted
      t.boolean :rejected

      t.timestamps
    end
  end
end
