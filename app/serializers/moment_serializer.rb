class MomentSerializer < ActiveModel::Serializer
  attributes :id, :description, :date

  has_many :photos

  has_one :author
end