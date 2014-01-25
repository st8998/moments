class AddConfigurationToPicturesSet < ActiveRecord::Migration
  def change
    add_column :pictures_sets, :configuration, :text, default: '{}'
    revert do
      add_column :pictures, :pos, :integer
    end
  end
end