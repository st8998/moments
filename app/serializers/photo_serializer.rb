class PhotoSerializer < ApplicationSerializer
  cached

  auto_init_js_class

  attributes(:id, :description, :width, :height, :date, :position)

  # technical info
  attributes(:exposure_time, :aperture_value, :iso, :focal_length)

  security_attributes :update, :delete

  has_one :place
  has_many :tags

  def description
    object.description.presence || begin
      object.moment.description if object.moment && object.moment.photos.size == 1
    end
  end

  def place
    object.moment.try(:place)
  end

  def date
    object.date.strftime('%d/%m/%Y %H:%M') if object.date
  end

  def attributes
    super.tap do |attrs|
      if object.image
        attrs[:image_url_64] = object.image.thumb('64x64#').convert('-sharpen 0x.75').url
        attrs[:image_url_200] = object.image.thumb('200x200#').convert('-sharpen 0x.5').url
        attrs[:image_url_256] = object.image.thumb('256x256>').convert('-sharpen 0x.5').url
        attrs[:image_url_512] = object.image.thumb('512x512>').convert('-sharpen 0x.5').url
        attrs[:image_url_1024] = object.image.thumb('1024x1024>').convert('-sharpen 0x.5').url
        attrs[:image_url_original] = object.image.url
      end
    end
  end

  SERIALIZER_MTIME = File.new(__FILE__).mtime
end