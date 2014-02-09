object @picture

attributes :id, :description
attributes :image_width => :width, :image_height => :height

node(:image_url_square) { |pic| pic.image.thumb('200x200#').url }
node(:image_url_small) { |pic| pic.image.thumb('512x512>').url }
node(:image_url_normal) { |pic| pic.image.thumb('1024x1024>').url }
node(:image_url_big) { |pic| pic.image.thumb('2048x2048>').url }