class BackupAllImagesToS3 < ActiveRecord::Migration
  def up
    Photo.find_each(batch_size: 100) do |photo|
      photo.update_attributes(image_backup: photo.image)
    end

    User.all.each do |user|
      if user.avatar
        user.update_attributes(avatar_backup: user.avatar)
      end
    end
  end
  def down
  end
end
