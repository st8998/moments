class Photo < ActiveRecord::Base
  include IncrementWithSql

  extend Dragonfly::Model
  dragonfly_accessor :image, app: :local do
    copy_to :image_backup
  end
  dragonfly_accessor :image_backup, app: :s3

  # versions
  # big - thumb('2048x2048')
  # normal - thumb('1024x1024')
  # small - thumb('512x512')
  # tiny - thumb('256x256')
  # square - thumb('200x200#')

  belongs_to :account
  belongs_to :moment

  has_and_belongs_to_many :tags, foreign_key: :tagged_object_id, touch: true

  before_save :analyze_image_attributes, if: -> pic { pic.image_uid_changed? && pic.image }

  def keywords= keywords
    self.tags += (keywords || []).map {|keyword| account.tags.find_or_create_by(name: keyword) }
  end

  def analyze_image_attributes
    %i[width height exposure_time aperture_value iso focal_length keywords date].each do |attr|
      self.send("#{attr}=", image.send(attr))
    end
  end
end
