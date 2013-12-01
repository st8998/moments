Moments::Application.routes.draw do
  root 'moments#index'

  resources :moments

  get '/search/*request', to: redirect {|params, _| "http://localhost:9200/#{params[:request]}" }
end
