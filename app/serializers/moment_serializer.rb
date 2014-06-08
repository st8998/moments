class MomentSerializer < ActiveModel::Serializer
  attributes :id, :description, :created_at

  has_many :photos
end