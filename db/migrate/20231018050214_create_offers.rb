class CreateOffers < ActiveRecord::Migration[7.1]
  def change
    create_table :offers do |t|
      t.string :description
      t.integer :min_age
      t.integer :max_age
      t.string :gender

      t.timestamps
    end
  end
end
