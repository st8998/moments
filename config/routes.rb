Moments::Application.routes.draw do
  root 'stories#new'

  resources :stories

  get :login, to: 'sessions#new'
  post :login, to: 'sessions#create'
  delete :logout, to: 'sessions#destroy'

  mount AppEndpoint, at: '/api'
end
