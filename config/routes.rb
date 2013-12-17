Moments::Application.routes.draw do
  root 'stories#new'

  resources :users, only: [:index]

  resources :stories

  get :login, to: 'sessions#new'
  post :login, to: 'sessions#create'
  delete :logout, to: 'sessions#destroy'

  mount API::App => '/api'
end
