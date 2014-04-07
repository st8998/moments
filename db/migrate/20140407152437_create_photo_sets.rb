class CreatePhotoSets < ActiveRecord::Migration
  def change
    create_table :photo_sets do |t|
      t.integer  :owner_id
      t.string   :owner_type
      t.integer  :account_id
      t.string   :key
    end
  end
end
