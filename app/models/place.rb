class Place < ActiveRecord::Base
  has_many :moments
  belongs_to :account
end
