Rails.application.routes.draw do
  resources :products, only: %i[index show] do
    resources :reviews, only: %i[create destroy]
  end

  resources :categories, only: [:show]

  resource :shopping_cart, only: [:show] do
    put :add_item
    delete :remove_item
  end

  resources :orders, only: %i[create show]
  resources :categories, only: [:index]

  # resources :orders
  # resources :line_items
  # resources :shopping_carts

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
