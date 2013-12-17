module API
  class App < Grape::API
    version 'v1', using: :path
    format :json

    helpers API::Cookies

    mount API::Pictures => '/'
  end
end