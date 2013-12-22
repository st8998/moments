Moments::Application.routes.draw do
  root to: redirect('/st8998/stories/new')

  get '/blog/:article_key', to: 'blog#article'

  scope path: '/:account_key' do
    resources :stories

    get :login, to: 'sessions#new'
    post :login, to: 'sessions#create'
    delete :logout, to: 'sessions#destroy'
  end

  mount AppEndpoint, at: '/api'
end
