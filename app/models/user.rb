require 'bcrypt'

class User < ActiveRecord::Base
  extend Dragonfly::Model

  dragonfly_accessor :avatar do
    after_assign {|a| a.thumb('256x256#') }
    default 'app/assets/images/default_avatar.jpg'
  end

  belongs_to :account

  # auth stuff
  attr_accessor :password
  before_save :encrypt_password

  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end
end
