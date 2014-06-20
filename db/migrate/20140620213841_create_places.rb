class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string   "name"
      t.float    "lat"
      t.float    "lng"
      t.string   "country"
      t.string   "administrative_area_level_2"
      t.string   "administrative_area_level_1"
      t.string   "locality"
      t.string   "route"
      t.string   "street_number"
      t.string   "postal_code"
      t.integer  "account_id"

      t.timestamps
    end

    add_column :moments, :place_id, :integer
  end
end
