class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.string :content
      t.integer :rating
      t.references :user
      t.references :product
      t.timestamps
    end
  end
end
