class UserEntity < Grape::Entity
  expose :id, :name
  expose :avatar do |u, _| u.avatar.thumb('64x64#').url end
end