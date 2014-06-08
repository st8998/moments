class AddAuthorToMoments < ActiveRecord::Migration
  def change
    add_column :moments, :author_id, :integer
  end
end
