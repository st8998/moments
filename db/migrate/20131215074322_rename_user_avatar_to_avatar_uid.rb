class RenameUserAvatarToAvatarUid < ActiveRecord::Migration
  def change
    rename_column :users, :avatar, :avatar_uid
  end
end
