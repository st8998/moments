class CriteriasPicturesSetsRelationship < ActiveRecord::Migration
  def change
    add_column :criteria, :owner_type, :string
    add_column :criteria, :owner_id, :integer

    revert do
      create_table :pictures_set_pictures do |t|
        t.integer :picture_id
        t.integer :pictures_set_id

        t.integer :th_width
        t.integer :th_height

        t.integer :th_left
        t.integer :th_top
        t.integer :c_left
        t.integer :c_top

        t.integer :pos

        t.timestamps
      end
    end
  end
end
