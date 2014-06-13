class MomentSerializer < ActiveModel::Serializer
  attributes :id, :description, :date, :parent_id

  has_one :author
  has_many :photos

  has_many :sub_moments

  def sub_moments
    object.parent_id.nil? ? object.sub_moments : []
  end

  def date
    object.date.strftime('%d/%m/%Y %H:%M') if object.date
  end
end