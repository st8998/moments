class PhotoSet < ActiveRecord::Base
  belongs_to :owner, polymorphic: true
  belongs_to :account

  # Explicit criteria should be the last one to work correctly
  has_many :criterias,
      -> { order("criterias.type = 'Criteria::Explicit'") },
      as: :owner

  def photos
    # isolate criterias scope
    criterias_scope = criterias(true).reduce(Photo.all) do |scope, criteria|
      criteria.apply(scope)
    end

    # limit pictures outside of criterias
    criterias_scope.where(account_id: account_id)
  end

  def add(pics)
    update_explicit_criteria(:approve!, pics)
  end

  def remove(pics)
    update_explicit_criteria(:reject!, pics)
  end

  private

  def update_explicit_criteria(method, pics)
    @explicit_criteria ||= criterias.find_or_create_by(type: 'Criteria::Explicit')
    @explicit_criteria.send(method, [*pics].map {|p| p.respond_to?(:id) ? p.id : p })
  end
end
