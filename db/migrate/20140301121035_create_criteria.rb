class CreateCriteria < ActiveRecord::Migration
  def change
    create_table :criteria do |t|
      t.json :attrs
      t.string :type
      t.integer :account_id

      t.timestamps
    end
  end
end
