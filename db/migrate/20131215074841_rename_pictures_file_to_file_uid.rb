class RenamePicturesFileToFileUid < ActiveRecord::Migration
  def change
    rename_column :pictures, :file, :file_uid
  end
end
