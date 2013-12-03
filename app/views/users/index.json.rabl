collection User.admin

attributes :id, :name
node(:avatar) {|user| user.avatar.small.url }