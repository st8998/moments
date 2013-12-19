Moments::Application.routes.draw do
  root 'stories#new'

  scope path: '/:account_key' do
    resources :stories

    get :login, to: 'sessions#new'
    post :login, to: 'sessions#create'
    delete :logout, to: 'sessions#destroy'
  end

  mount AppEndpoint, at: '/api'
end
