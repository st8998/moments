class SessionsController < ApplicationController
  skip_before_action :ensure_account

  def new
    render layout: false
  end

  def create
    user_attrs = params.require(:user).permit(:email, :password)

    user = User.find_by(email: user_attrs[:email])

    if user && user.password_hash == BCrypt::Engine.hash_secret(user_attrs[:password], user.password_salt)
      cookies.permanent.signed[:id] = user.id
      redirect_back_or(account_root_path(user.account.key), notice: 'Success')
    else
      redirect_to :back, alert: 'You shall not pass!'
    end
  end

  def destroy
    cookies.delete(:id)
    cookies.delete(:akey)
    redirect_to root_path
  end
end
