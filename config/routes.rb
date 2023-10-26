Rails.application.routes.draw do
  root 'main#index'

  # User registration and sessions routes
  get '/users/new', to: 'users#new'
  get '/user_sessions/new', to: 'user_sessions#new'
  post '/users', to: 'users#create'
  delete '/user_sessions', to: 'user_sessions#destroy'

  # RESTful routes for user management
  resources :user_sessions, only: [:new, :create]
  resources :users, only: [:show, :edit, :update, :destroy] do
    # Define other user-related routes as needed
  end

  namespace :api do
    namespace :v1 do
      resources :users, only: [:create] do
        member do
          post 'accept_offer'
          post 'reject_offer'
        end
      end

      scope 'user_offers' do
        get 'accepted_offers', to: 'user_offers#accepted_offers'
        get 'rejected_offers', to: 'user_offers#rejected_offers'
      end

      resources :offers, only: [:index]
      get 'users/:id', to: 'users#show'
      get 'user_data', to: 'users#user_data'
    end
  end
end
