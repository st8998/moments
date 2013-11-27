class CreateMoments < ActiveRecord::Migration
  def change
    create_table :moments do |t|
      t.string :lat
      t.string :lng
      t.string :title

      t.text :description
      t.datetime :date

      t.timestamps
    end
  end
end
