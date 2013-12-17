class UsersEndpoint < Grape::API
  namespace 'users' do
    get do
      present User.all, with: UserEntity
    end
  end
end