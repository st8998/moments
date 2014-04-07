class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string   :password_hash
      t.string   :password_salt
      t.string   :name
      t.string   :avatar_uid
      t.integer  :account_id
      t.string   :email
    end
  end
end
