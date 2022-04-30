class Review < ApplicationRecord
  belongs_to :product

  validates :product_id, presence: true
  validates :user_id, presence: true
  validates :rating, presence: true
  validates_numericality_of :rating, only_integer: true
  validates_inclusion_of :rating, in: 1..5
end
