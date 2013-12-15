class AddColumnsToPictures < ActiveRecord::Migration
  def change
    add_column :pictures, :width, :integer
    add_column :pictures, :height, :integer
    add_column :pictures, :th_width, :integer
    add_column :pictures, :th_height, :integer
    add_column :pictures, :th_left, :integer
  end
end
