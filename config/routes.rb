Moments::Application.routes.draw do
  root to: redirect('/blog/about_pictures_component')

  get '/blog/:article_key', to: 'blog#article'

  scope path: '/:account_key' do


    get :login, to: 'sessions#new'
    post :login, to: 'sessions#create'
    delete :logout, to: 'sessions#destroy'
  end

  mount AppEndpoint, at: '/api'
end
