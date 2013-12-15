class Picture < ActiveRecord::Base
  extend Dragonfly::Model
  dragonfly_accessor :image

  # versions
  # big - thumb('2048x2048')
  # normal - thumb('1024x1024')
  # small - thumb('512x512')
  # tiny - thumb('256x256')
  # square - thumb('200x200#')

  belongs_to :owner, polymorphic: true
end
