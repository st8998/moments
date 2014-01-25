Moments::Application.routes.draw do
  root to: redirect('/blog/about_pictures_component')

  get '/blog/:article_key', to: 'blog#article'

  scope path: '/:account_key' do
    resources :pictures, defaults: {format: :json}, except: [:show, :new] do
      post :upload, on: :collection
      post :reorder, on: :collection
    end

    get :login, to: 'sessions#new'
    post :login, to: 'sessions#create'
    delete :logout, to: 'sessions#destroy'
  end
end
