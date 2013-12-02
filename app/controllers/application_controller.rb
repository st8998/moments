class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  hide_action :current_user
  helper_method :current_user

  def current_user
    @current_user ||= User.find_by(id: cookies.signed[:id]) if cookies[:id]
  end

  private

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
