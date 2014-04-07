Moments::Application.routes.draw do
  root to: 'application#root'

  get :login, to: 'sessions#new'
  post :login, to: 'sessions#create'
  delete :logout, to: 'sessions#destroy'

  get '/template/*path', to: 'templates#template'

  scope path: '/:account_key' do
    scope defaults: {format: :json} do

    end
  end
end
