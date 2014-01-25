Moments::Application.routes.draw do
  root to: redirect('/blog/about_pictures_component')

  get '/blog/:article_key', to: 'blog#article'

  scope path: '/:account_key' do

    scope defaults: {format: :json} do
      scope path: '/:pictures_set_id' do
        resources :pictures, only: [:index]

        post '/reorder', to: 'pictures#reorder'
      end

      resources :pictures, only: [:index, :destroy] do
        post :upload, on: :collection
      end
    end

    get :login, to: 'sessions#new'
    post :login, to: 'sessions#create'
    delete :logout, to: 'sessions#destroy'
  end
end
