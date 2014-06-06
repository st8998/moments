class PhotoSerializer < ActiveModel::Serializer
  attributes(:id, :description)

  attributes(:image_url_small, :image_url_normal, :image_url_big)

  def width
    object.image_width
  end

  def height
    object.image_height
  end

  def image_url_small
    object.image.thumb('512x512>').url if object.image
  end

  def image_url_normal
    object.image.thumb('1024x1024>').url if object.image
  end

  def image_url_big
    object.image.thumb('2048x2048>').url if object.image
  end
end