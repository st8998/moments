class MomentSerializer < ApplicationSerializer
  cached

  attributes :id, :description, :date, :parent_id

  has_one :author
  has_one :place

  has_many :photos

  has_many :sub_moments

  has_many :photo_set

  security_attributes :update, :delete, :create_sub_moment

  def attributes
    # for caching reasons only id, updated_at are loaded initially
    # this workaround will load all attributes for uncached entries
    object.reload
    super
  end

  def sub_moments
    object.parent_id.nil? ? object.sub_moments : []
  end

  def date
    object.date.strftime('%d/%m/%Y %H:%M') if object.date
  end

  SERIALIZER_MTIME = File.new(__FILE__).mtime
end