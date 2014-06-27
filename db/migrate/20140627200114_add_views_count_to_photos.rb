class AddViewsCountToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :views_count, :integer, default: 0
  end
end
