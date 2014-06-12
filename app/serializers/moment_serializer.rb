class MomentSerializer < ActiveModel::Serializer
  attributes :id, :description, :date, :parent_id

  has_one :author
  has_many :photos

  has_many :sub_moments

  def date
    object.date.strftime('%d/%m/%Y %H:%M') if object.date
  end
end