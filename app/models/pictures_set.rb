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
end
