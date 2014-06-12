class MomentSerializer < ActiveModel::Serializer
  attributes :id, :description, :date

  has_many :photos

  has_one :author

  def date
    object.date.strftime('%d/%m/%Y %H:%M') if object.date
  end
end