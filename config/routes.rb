Moments::Application.routes.draw do
  root 'moments#index'

  resources :moments

  get :login, to: 'sessions#new'
  post :login, to: 'sessions#create'
  delete :logout, to: 'sessions#destroy'
end
