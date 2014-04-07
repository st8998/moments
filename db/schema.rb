# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140407152437) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: true do |t|
    t.string "key"
  end

  create_table "criterias", force: true do |t|
    t.json    "attrs"
    t.string  "type"
    t.integer "account_id"
    t.string  "owner_type"
    t.integer "owner_id"
  end

  create_table "photo_sets", force: true do |t|
    t.integer "owner_id"
    t.string  "owner_type"
    t.integer "account_id"
    t.string  "key"
  end

  create_table "photos", force: true do |t|
    t.text    "description"
    t.string  "image_uid"
    t.integer "width"
    t.integer "height"
    t.integer "account_id"
    t.string  "exposure_time"
    t.float   "aperture_value"
    t.integer "iso"
    t.integer "focal_length"
  end

  create_table "users", force: true do |t|
    t.string  "password_hash"
    t.string  "password_salt"
    t.string  "name"
    t.string  "avatar_uid"
    t.integer "account_id"
    t.string  "email"
  end

end
