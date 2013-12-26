module Grape::Authentication

  def current_account
    @current_account ||= Account.find_by(key: params[:account_key])
  end

  def current_ability
    @ability ||= Ability.new(current_account)
  end

  def authorize! *args
    error!('401 Unauthorized', 401) if current_ability.cannot?(*args)
  end

  delegate :can?, :cannot?, to: :current_ability

end