class PicturesSet < ActiveRecord::Base
  belongs_to :owner, polymorphic: true
  belongs_to :account

  has_many :criterias, as: :owner

  def pictures
    criterias(true).reduce(Picture.where(account_id: account_id)) do |scope, criteria|
      criteria.apply(scope)
    end
  end

  def add(pic)
    if pic.account_id == account_id
      explicit_criteria = criterias.find_or_create_by(type: 'Criteria::Explicit')
      explicit_criteria.approve!(pic.id)
    end
  end

  def remove(pic)
    if pic.account_id == account_id
      explicit_criteria = criterias.find_or_create_by(type: 'Criteria::Explicit')
      explicit_criteria.reject!(pic.id)
    end
  end
end
