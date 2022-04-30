class CreateLineItems < ActiveRecord::Migration[6.1]
  def change
    create_table :line_items do |t|
      t.integer :quantity
      t.references :product
      t.references :shopping_cart
      t.references :order
      t.timestamps
    end
  end
end
