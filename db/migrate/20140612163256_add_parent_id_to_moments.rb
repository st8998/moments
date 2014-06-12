class AddParentIdToMoments < ActiveRecord::Migration
  def change
    add_column :moments, :parent_id, :integer
  end
end
