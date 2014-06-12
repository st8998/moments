class Moment < ActiveRecord::Base
  extend EnhancedNestedAttributes

  belongs_to :account

  belongs_to :author, class_name: 'User'

  has_many :photos, dependent: :destroy
  accepts_nested_attributes_for :photos, allow_destroy: true
end
