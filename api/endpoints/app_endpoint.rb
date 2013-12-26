class AppEndpoint < Grape::API
  version 'v1', using: :path
  format :json

  helpers Grape::Logging
  helpers Grape::Cookies
  helpers Grape::Authentication

  mount AccountsEndpoint
  mount UsersEndpoint
  mount PicturesEndpoint
end
