class MomentSerializer < ActiveModel::Serializer
  attributes :id, :description, :created_at

  has_many :photos

  def photos
    object.photo_set ? object.photo_set.photos : []
  end
end