class Moment < ActiveRecord::Base
  extend EnhancedNestedAttributes

  belongs_to :account

  belongs_to :author, class_name: 'User'

  belongs_to :place
  accepts_nested_attributes_for :place, allow_destroy: true

  has_many :photos, dependent: :destroy
  accepts_nested_attributes_for :photos, allow_destroy: true

  belongs_to :parent, class_name: 'Moment', touch: true
  has_many :sub_moments, -> { order(:date.asc) },
      class_name: 'Moment', foreign_key: :parent_id, dependent: :destroy

  scope :root, -> { where(parent_id: nil) }
end
