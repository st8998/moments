class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string :key
      t.boolean :demo, default: false

      t.timestamps
    end

    add_column :users, :account_id, :integer
    add_column :pictures, :account_id, :integer
    add_column :places, :account_id, :integer
  end
end
