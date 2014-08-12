class AddImageBackupUidToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :image_backup_uid, :string
    add_column :users, :avatar_backup_uid, :string
  end
end
