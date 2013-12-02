class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :password_hash
      t.string :password_salt
      t.string :name
      t.boolean :admin, default: false

      t.string :avatar

      t.timestamps
    end
  end
end
