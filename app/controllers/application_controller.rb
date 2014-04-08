class ApplicationController < ActionController::Base
  include ParamsDecoderConcern

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception

  hide_action :current_user, :current_account
  helper_method :current_user, :current_account

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end

  decent_configuration do
    strategy DecentExposure::StrongParametersStrategy
  end

  def root
    if current_user
      redirect_to account_root_path(account_key: current_user.account.key)
    else
      redirect_to login_path
    end
  end

  def current_account
    @current_account ||= Account.find_by(key: params[:account_key])
  end

  def current_ability
    @ability ||= Ability.new(current_account, current_user)
  end

  def current_user
    @current_user ||= User.find_by(id: cookies.signed[:id]) if cookies[:id]
  end

  rescue_from CanCan::AccessDenied do |exception|
    render text: 'GO AWAY', status: 403
  end

  protected

  def redirect_back_or(default, opts = {})
    redirect_to(session.delete(:return_to) || default, opts)
  end

  def store_location
    session[:return_to] = request.fullpath
  end

  def ensure_user
    unless current_user
      store_location
      redirect_to(login_path)
    end
  end
end
