class SessionsController < ApplicationController
  skip_before_filter :ensure_user, only: :create

  def new
  end

  def create
    user_attrs = params.require(:user).permit(:id, :password)

    user = User.find(user_attrs[:id])

    if user && user.password_hash == BCrypt::Engine.hash_secret(user_attrs[:password], user.password_salt)
      cookies.permanent.signed[:id] = user.id
      redirect_back_or(root_path, notice: 'Success')
    else
      redirect_to :back, alert: 'You shall not pass!'
    end
  end

  def destroy
    cookies.delete(:id)
    redirect_to :back, notice: 'Success'
  end
end
