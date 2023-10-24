Rails.application.routes.draw do
  root 'main#index'

  # Define routes for user registration
  get '/users/new', to: 'users#new'    # Displays the signup form
  post '/users', to: 'users#create'     # Handles user creation

  # Additional routes if needed
  resources :users, only: [:show, :edit, :update, :destroy] do
    # Define other user-related routes as needed
  end

  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
    end
  end
end
