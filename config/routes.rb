Moments::Application.routes.draw do
  root 'moments#index'

  resources :moments
end
