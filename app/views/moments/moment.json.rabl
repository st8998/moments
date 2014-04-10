object(moment) unless root_object

attributes :id, :description

node :photo_set do |moment|
  partial('photo_sets/photo_set', object: moment.photo_set)
end
