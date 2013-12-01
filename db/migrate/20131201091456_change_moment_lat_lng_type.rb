class ChangeMomentLatLngType < ActiveRecord::Migration
  def up
    change_column :moments, :lat, :float
    change_column :moments, :lng, :float
  end
  def down
    change_column :moments, :lat, :string
    change_column :moments, :lng, :string
  end
end
