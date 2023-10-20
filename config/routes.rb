Rails.application.routes.draw do
  get 'main/index'
  root 'main#index'

  resources :user_sessions, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create] do
    get 'show_recommendations', on: :member
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :users, only: [:create]
    end
  end
end
