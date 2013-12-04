Moments::Application.routes.draw do
  root 'moments#index'

  resources :users, only: [:index]
  resources :moments, encode: [:id]

  get :login, to: 'sessions#new'
  post :login, to: 'sessions#create'
  delete :logout, to: 'sessions#destroy'
end
