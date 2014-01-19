class ReorganizeMoments < ActiveRecord::Migration
  def change
    add_column :moments, :place_id, :integer
    add_column :moments, :pictures_set_id, :integer

    revert do
      add_column :moments, :lat, :float
      add_column :moments, :lng, :float
    end
  end
end
