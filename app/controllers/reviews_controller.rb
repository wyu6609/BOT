class ReviewsController < ApplicationController
  def index
    render json: Review.all
  end
  def create
    new_review = @current_user.recipes.create!(review_params)
    render json: new_review, status: :created
  end

  private

  def review_params
    params.permit(:content, :rating, :product_id)
  end
end
