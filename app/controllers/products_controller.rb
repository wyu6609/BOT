class ProductsController < ApplicationController
  def index
    products = Product.all.order(price: :asc)
    render json: products
  end
end
