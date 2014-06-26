class PhotoSerializer < ActiveModel::Serializer
  cached

  attributes(:id, :description, :width, :height, :date)

  # technical info
  attributes(:exposure_time, :aperture_value, :iso, :focal_length)

  def date
    object.date.strftime('%d/%m/%Y %H:%M') if object.date
  end

  def attributes
    super.tap do |attrs|
      if object.image
        attrs[:image_url_64] = object.image.thumb('64x64#').convert('-sharpen 0x.75').url
        attrs[:image_url_square] = object.image.thumb('200x200#').convert('-sharpen 0x.75').url
        attrs[:image_url_256] = object.image.thumb('256x256>').convert('-sharpen 0x.75').url
        attrs[:image_url_512] = object.image.thumb('512x512>').convert('-sharpen 0x.75').url
        attrs[:image_url_1024] = object.image.thumb('1024x1024>').convert('-sharpen 0x.75').url
        attrs[:image_url_original] = object.image.url
      end
    end
  end

  SERIALIZER_MTIME = File.new(__FILE__).mtime
end