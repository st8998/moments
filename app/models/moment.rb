class Moment < ActiveRecord::Base
  extend EnhancedNestedAttributes

  belongs_to :account

  has_many :photos
  accepts_nested_attributes_for :photos, allow_destroy: true
end
