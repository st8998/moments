class AddPositionToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :position, :integer

    Moment.all.each do |moment|
      moment.photos.each.with_index do |photo, i|
        photo.update_attributes(position: i)
      end
    end
  end
end
