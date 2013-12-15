collection User.admin

attributes :id, :name
node(:avatar) {|user| user.avatar.thumb('64x64#').url }