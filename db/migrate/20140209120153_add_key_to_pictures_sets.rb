class AddKeyToPicturesSets < ActiveRecord::Migration
  def change
    add_column :pictures_sets, :key, :string
  end
end
