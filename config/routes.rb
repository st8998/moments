Moments::Application.routes.draw do
  root 'moments#index'

  resources :moments

  #match '/search/*request',
  #    via: [:get, :post],
  #    to: redirect {|params, _| "http://localhost:9200/#{params[:request]}" }
end
