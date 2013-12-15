class CreateMoments < ActiveRecord::Migration
  def change
    create_table :moments do |t|
      t.float :lat
      t.float :lng
      t.string :title

      t.text :description
      t.datetime :date

      t.timestamps
    end
  end
end
