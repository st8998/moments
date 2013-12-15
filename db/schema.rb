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

ActiveRecord::Schema.define(version: 20131215083917) do

  create_table "moments", force: true do |t|
    t.float    "lat",         limit: 255
    t.float    "lng",         limit: 255
    t.string   "title"
    t.text     "description"
    t.datetime "date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pictures", force: true do |t|
    t.text     "description"
    t.string   "image_uid"
    t.integer  "owner_id"
    t.string   "owner_type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "image_width"
    t.integer  "image_height"
  end

  create_table "places", force: true do |t|
    t.string   "name"
    t.float    "lat"
    t.float    "lng"
    t.string   "country"
    t.string   "administrative_area_level_2"
    t.string   "administrative_area_level_1"
    t.string   "locality"
    t.string   "route"
    t.string   "street_number"
    t.string   "postal_code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "password_hash"
    t.string   "password_salt"
    t.string   "name"
    t.boolean  "admin",         default: false
    t.string   "avatar_uid"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
