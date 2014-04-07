class CreateCriterias < ActiveRecord::Migration
  def change
    create_table :criterias do |t|
      t.json     :attrs
      t.string   :type
      t.integer  :account_id
      t.string   :owner_type
      t.integer  :owner_id
    end
  end
end
