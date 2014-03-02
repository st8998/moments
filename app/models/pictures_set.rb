class PicturesSet < ActiveRecord::Base
  belongs_to :owner, polymorphic: true
  belongs_to :account

  # Explicit criteria should be the last one to work correctly
  has_many :criterias,
      -> { order("criterias.type = 'Criteria::Explicit'") },
      as: :owner

  def pictures
    # isolate criterias scope
    criterias_scope = criterias(true).reduce(Picture.all) do |scope, criteria|
      criteria.apply(scope)
    end

    # limit pictures outside of criterias
    criterias_scope.where(account_id: account_id)
  end

  def add(pic)
    explicit_criteria = criterias.find_or_create_by(type: 'Criteria::Explicit')
    explicit_criteria.approve!([*pic].map {|p| p.respond_to?(:id) ? p.id : p })
  end

  def remove(pic)
    explicit_criteria = criterias.find_or_create_by(type: 'Criteria::Explicit')
    explicit_criteria.reject!([*pic].map {|p| p.respond_to?(:id) ? p.id : p })
  end
end
