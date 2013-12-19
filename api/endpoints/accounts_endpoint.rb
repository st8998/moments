class AccountsEndpoint < Grape::API
  namespace 'accounts' do
    post 'demo' do
      account = Account.create_demo
      present account, with: AccountEntity
    end
  end
end