class AddAccountIdToPicturesSet < ActiveRecord::Migration
  def change
    add_column :pictures_sets, :account_id, :integer
  end
end
