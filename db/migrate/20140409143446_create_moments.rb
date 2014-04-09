class CreateMoments < ActiveRecord::Migration
  def change
    create_table :moments do |t|
      t.integer :account_id
      t.text :description

      t.timestamps
    end
  end
end
