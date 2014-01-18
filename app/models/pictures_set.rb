class PicturesSet < ActiveRecord::Base
  has_many :pictures
  belongs_to :owner, polymorphic: true
end
