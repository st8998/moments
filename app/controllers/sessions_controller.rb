class SessionsController < ApplicationController
  skip_before_action :ensure_user, only: :create

  def new
    render layout: false
  end

  def create
    user_attrs = params.require(:user).permit(:email, :password)

    user = User.find_by(email: user_attrs[:email])

    puts user

    if user && user.password_hash == BCrypt::Engine.hash_secret(user_attrs[:password], user.password_salt)
      cookies.permanent.signed[:id] = user.id
      redirect_back_or(root_path, notice: 'Success')
    else
      redirect_to :back, alert: 'You shall not pass!'
    end
  end

  def destroy
    cookies.delete(:id)
    redirect_to root_path
  end
end
