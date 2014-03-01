class RefactorPictureAttributes < ActiveRecord::Migration
  def change
    rename_column :pictures, :image_height, :height
    rename_column :pictures, :image_width, :width

    add_column :pictures, :exposure_time, :string
    add_column :pictures, :aperture_value, :float
    add_column :pictures, :iso, :integer
    add_column :pictures, :focal_length, :integer
  end
end
