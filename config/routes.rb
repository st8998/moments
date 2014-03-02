Moments::Application.routes.draw do
  root to: 'application#root'

  get '/blog/:article_key', to: 'blog#article'

  get :login, to: 'sessions#new'
  post :login, to: 'sessions#create'
  delete :logout, to: 'sessions#destroy'

  get '/template/*path', to: 'templates#template'

  scope path: '/:account_key' do

    get '/', to: 'photostream#index', as: :account_root

    scope defaults: {format: :json} do
      get '/photostream', to: 'photostream#index'
      post '/photostream/:picture_id', to: 'photostream#add'
      delete '/photostream/:picture_id', to: 'photostream#remove'

      #scope path: '/:pictures_set_id' do
      #  resources :pictures, only: [:index]
      #
      #  post '/reorder', to: 'pictures#reorder'
      #end

      resources :pictures do
        post :upload, on: :collection
      end
    end
  end
end
