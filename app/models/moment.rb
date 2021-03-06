class Moment < ActiveRecord::Base
  extend EnhancedNestedAttributes

  belongs_to :account

  belongs_to :author, class_name: 'User'

  belongs_to :place
  accepts_nested_attributes_for :place, allow_destroy: true

  has_many :photos, -> { order(:position, :date.asc) },
      dependent: :destroy
  accepts_nested_attributes_for :photos, allow_destroy: true
  after_save do
    photos.each(&:touch)
  end

  belongs_to :parent, class_name: 'Moment', touch: true
  has_many :sub_moments, -> { order(:date.asc) },
      class_name: 'Moment', foreign_key: :parent_id, dependent: :destroy

  scope :root, -> { where(parent_id: nil) }

  def photo_set
    if parent_id.nil?
      sub_moments.reduce(photos) do |photos, moment|
        photos + moment.photos
      end
    else
      photos
    end
  end

end
