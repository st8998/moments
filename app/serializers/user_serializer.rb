class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :avatar

  def avatar
    object.avatar.
        thumb('64x64#').
        convert('-set colorspace Gray -separate -average').
        convert('-brightness-contrast +10x+25').url
  end
end