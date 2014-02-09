class PicturesSet < ActiveRecord::Base
  has_many :pictures_set_pictures

  has_many :pictures,
      -> {
        select("pictures.*, #{PicturesSetPicture::PICTURE_ATTRIBUTES_SELECT_STATEMENT}").
          order('pictures_set_pictures.pos NULLS LAST')
      },
      through: :pictures_set_pictures, source: :picture

  belongs_to :owner, polymorphic: true
  belongs_to :account

  serialize :configuration, JSON

  def add(picture_or_id)
    id = picture_or_id.is_a?(Picture) ? picture_or_id.id : picture_or_id
    pictures_set_pictures.create(picture_id: id)
  end

  def remove(picture_or_id)
    id = picture_or_id.is?(Picture) ? picture_or_id.id : picture_or_id
    pictures_set_pictures.where(picture_id: id).destroy_all
  end

end
