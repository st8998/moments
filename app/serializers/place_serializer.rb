class PlaceSerializer < ActiveModel::Serializer
  cached

  attributes(:id, :name, :lat, :lng, :country, :administrative_area_level_2,
      :administrative_area_level_1, :locality, :route, :street_number, :postal_code)

  SERIALIZER_MTIME = File.new(__FILE__).mtime
end