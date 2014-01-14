class AddPosToPictures < ActiveRecord::Migration
  def change
    add_column :pictures, :pos, :integer
  end
end
