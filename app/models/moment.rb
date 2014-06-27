class Moment < ActiveRecord::Base
  extend EnhancedNestedAttributes
  include Elastic::Exportable

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

  def photo_set
    if parent_id.nil?
      sub_moments.reduce(photos) do |photos, moment|
        photos + moment.photos
      end
    else
      photos
    end
  end

  def elastic_export
    hash = {
      id: id,
      description: description,
      date: date
    }

    hash[:author] = { name: author.name } if author
    hash[:place] = { name: place.name, country: place.country } if place

    hash
  end
end
