Rails.application.routes.draw do
  get 'main/index'
  root 'main#index'
  resources :users, only: [:new, :create]
end
