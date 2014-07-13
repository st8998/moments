class CleanupPhotos < ActiveRecord::Migration
  def change
    Photo.all.each do |photo|
      photo.destroy && next if photo.moment_id.nil? || photo.image_uid.nil?

      photo.keywords = photo.image.analyse(:keywords)
    end
  end
end
