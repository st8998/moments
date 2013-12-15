object picture

attributes :id, :description
attributes image_width: :width, image_height: :height

node :image_url_small do |p|
  p.image.thumb('512x512').url
end
node :image_url_normal do |p|
  p.image.thumb('1024x1024').url
end
node :image_url_big do |p|
  p.image.thumb('2048x2048').url
end
