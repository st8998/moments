class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :name
      t.integer :account_id
      t.timestamps
    end

    create_table :photos_tags, id: false do |t|
      t.integer :tagged_object_id
      t.integer :tag_id
    end
  end
end
