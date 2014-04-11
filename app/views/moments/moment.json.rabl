object(moment) unless root_object

attributes :id, :description

node :photos do |moment|
  partial('photos/photo', object: moment.photos)
end
