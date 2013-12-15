class RefactorPictureAttachmentAttributes < ActiveRecord::Migration
  def change
    rename_column :pictures, :file_uid, :image_uid
    rename_column :pictures, :width, :image_width
    rename_column :pictures, :height, :image_height

    revert do
      add_column :pictures, :th_width, :integer
      add_column :pictures, :th_height, :integer
      add_column :pictures, :th_left, :integer
    end
  end
end
