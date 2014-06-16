class PhotoSetSerializer < ActiveModel::Serializer
  embed :ids, include: true

  attributes :id

  has_many :photos
end