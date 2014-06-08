class AddMomentRelationToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :moment_id, :integer
  end
end
