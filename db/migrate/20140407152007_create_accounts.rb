class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string :key
    end
  end
end
