if @moments
  collection(@moments)
elsif root_object.nil?
  object(moment)
end

attributes :id, :description

node :photos do |moment|
  partial('photos/photo', object: moment.photos)
end
