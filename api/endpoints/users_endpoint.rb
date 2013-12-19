class UsersEndpoint < Grape::API
  route_param :account_key do
    namespace 'users' do
      get do
        present Account.find_by(key: params[:account_key]).members, with: UserEntity
      end
    end
  end
end