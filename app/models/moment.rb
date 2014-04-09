class Moment < ActiveRecord::Base
  extend EnhancedNestedAttributes

  has_one :photo_set, as: :owner
  accepts_nested_attributes_for :photo_set, allow_destroy: true
end
