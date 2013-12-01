class Picture < ActiveRecord::Base
  class Uploader < CarrierWave::Uploader::Base
    include CarrierWave::MiniMagick

    storage :file
    store_dir 'public/pictures'

    process resize_to_fit: [2048, 2048]

    version :normal do
      process resize_to_fit: [1024, 1024]
    end

    version :small do
      process resize_to_fit: [256, 256]
    end

    version :square do
      process resize_to_fill: [200, 200]
    end
  end

  belongs_to :owner, polymorphic: true
  mount_uploader :file, Uploader
end
