class Photo < ActiveRecord::Base
  extend Dragonfly::Model
  dragonfly_accessor :image

  # versions
  # big - thumb('2048x2048')
  # normal - thumb('1024x1024')
  # small - thumb('512x512')
  # tiny - thumb('256x256')
  # square - thumb('200x200#')

  belongs_to :account

  before_save :analyze_image_attributes, if: -> pic { pic.image_uid_changed? && pic.image }

  attr_accessor :keywords

  def analyze_image_attributes
    %i[width height exposure_time aperture_value iso focal_length keywords].each do |attr|
      self.send("#{attr}=", image.send(attr))
    end
  end
end
