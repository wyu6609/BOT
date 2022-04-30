class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.string :username
      t.string :first_name
      t.string :last_name
      t.integer :total_price
      t.timestamps
    end
  end
end
