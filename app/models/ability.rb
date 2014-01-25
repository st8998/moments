class Ability
  include CanCan::Ability

  def initialize(account)

    if account.demo?
      can :manage, PicturesSet, account_id: account.id
      can :manage, Picture, account_id: account.id
    end

  end
end
