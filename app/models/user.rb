require 'bcrypt'

class User < ActiveRecord::Base
  #avatar stuff
  class AvatarUploader < CarrierWave::Uploader::Base
    include CarrierWave::MiniMagick

    storage :file
    store_dir 'avatars'

    process resize_to_fill: [256, 256]

    version :small do
      process resize_to_fill: [64, 64]
    end

    def default_url
      '/assets/' + [version_name, "default_avatar.jpg"].compact.join('_')
    end
  end

  mount_uploader :avatar, AvatarUploader

  # auth stuff
  attr_accessor :password
  before_save :encrypt_password

  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end

  scope :admin, -> { where(admin: true) }

end
