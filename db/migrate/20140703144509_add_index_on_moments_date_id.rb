class AddIndexOnMomentsDateId < ActiveRecord::Migration
  def change
    add_index :moments, [:date, :id], order: {date: :desc, id: :desc}

    add_index :moments, :account_id
    add_index :moments, :parent_id

    add_index :photos, :moment_id
    add_index :photos, :account_id
    add_index :photos, :date, order: {date: :desc}

    add_index :users, :account_id
  end
end
