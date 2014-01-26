class PicturesSetPicture < ActiveRecord::Base
  belongs_to :picture
  belongs_to :pictures_set

  before_save :drain_attributes

  PICTURE_ATTRIBUTES = %i[th_width th_height th_left th_top c_left c_top pos]

  PICTURE_ATTRIBUTES_SELECT_STATEMENT =
      PICTURE_ATTRIBUTES.map {|attr| "pictures_set_pictures.#{attr} as #{attr}" }.join(',')

  module VirtualAttributes
    PICTURE_ATTRIBUTES.each do |attr|
      class_eval <<-RUBY, __FILE__, __LINE__
        def #{attr}
          self[:#{attr}] || @#{attr}
        end
        def #{attr}= value
          @#{attr} = value
        end
      RUBY
    end
  end

  private

  def drain_attributes
    if picture
      PICTURE_ATTRIBUTES.each {|attr| self[attr] = picture.send(attr) if picture.send(attr) }
    end
  end
end
