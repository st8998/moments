class Ability
  include CanCan::Ability

  def initialize(account, user)

    if account.present? && user.present? && account.id == user.account_id
      can :manage, PicturesSet, account_id: account.id
      can :manage, Picture, account_id: account.id
    else
      can :read, [PicturesSet, Picture]
    end

  end
end
