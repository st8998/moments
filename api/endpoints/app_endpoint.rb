class AppEndpoint < Grape::API
  version 'v1', using: :path
  format :json

  helpers do
    def logger
      Rails.logger
    end
  end
  helpers Grape::Cookies

  mount UsersEndpoint
  mount PicturesEndpoint
end
