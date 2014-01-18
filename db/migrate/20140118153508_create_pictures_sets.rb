class CreatePicturesSets < ActiveRecord::Migration
  def change
    create_table :pictures_sets do |t|
      t.integer :owner_id
      t.string :owner_type

      t.timestamps
    end
  end
end
