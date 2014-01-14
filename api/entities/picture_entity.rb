class PictureEntity < Grape::Entity
  expose :id
  expose :description
  expose :pos
  expose :image_width, as: :width
  expose :image_height, as: :height

  expose :image_url_small do |pic, _|
    pic.image.thumb('512x512').url
  end
  expose :image_url_normal do |pic, _|
    pic.image.thumb('1024x1024').url
  end
  expose :image_url_big do |pic, _|
    pic.image.thumb('2048x2048').url
  end
end