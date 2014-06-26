class AddCreatedUpdatedAtToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :created_at, :datetime
    add_column :photos, :updated_at, :datetime
  end
end
