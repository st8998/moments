class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :avatar

  def avatar
    object.avatar.thumb('48x48#').url
        # thumb('48x48#').
        # convert('-set colorspace Gray -separate -average').
        # convert('-brightness-contrast +10x+25').url
  end
end