class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.text :description
      t.string :file
      t.integer :owner_id
      t.string :owner_type
      t.timestamps
    end
  end
end
