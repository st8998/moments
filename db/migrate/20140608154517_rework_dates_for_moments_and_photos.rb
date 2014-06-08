class ReworkDatesForMomentsAndPhotos < ActiveRecord::Migration
  def change
    add_column :moments, :date, :datetime
    add_column :photos, :date, :datetime
  end
end
