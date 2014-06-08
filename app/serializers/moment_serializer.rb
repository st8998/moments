class MomentSerializer < ActiveModel::Serializer
  attributes :id, :description, :created_at

  has_many :photos

  has_one :author
end