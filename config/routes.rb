Moments::Application.routes.draw do
  root to: 'application#root'

  get :login, to: 'sessions#new'
  post :login, to: 'sessions#create'
  get :logout, to: 'sessions#destroy'

  get '/template/*path', to: 'templates#template'

  scope path: '/:account_key' do
    get '/', to: 'moments#index', as: :account_root

    scope defaults: {format: :json} do
      resources :moments
      resources :photos
    end
  end
end
