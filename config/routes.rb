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
      # API routes for user management

      resources :users, only: [:create] do
        post 'add_offer', on: :member
        post 'reject_offer', on: :member
      end

      resources :offers, only: [:index]
      get 'users/:id', to: 'users#show'
      get 'user_data', to: 'users#user_data'

    end
  end
end
