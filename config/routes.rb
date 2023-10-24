Rails.application.routes.draw do
  root 'main#index'

  # Define routes for user registration
  get '/users/new', to: 'users#new'
  get 'user_sessions/new'
  post '/users', to: 'users#create'


  resources :user_sessions, only: [:new, :create]
  resources :users, only: [:show, :edit, :update, :destroy] do
    # Define other user-related routes as needed
  end

  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
    end
  end
end
