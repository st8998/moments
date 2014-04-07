class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.text     :description
      t.string   :image_uid
      t.integer  :width
      t.integer  :height
      t.integer  :account_id
      t.string   :exposure_time
      t.float    :aperture_value
      t.integer  :iso
      t.integer  :focal_length
    end
  end
end
