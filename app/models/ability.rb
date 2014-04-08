class Ability
  include CanCan::Ability

  def initialize(account, user)

    if account.present? && user.present? && account.id == user.account_id
      can :manage, PhotoSet, account_id: account.id
      can :manage, Photo, account_id: account.id
    else
      can :read, [PhotoSet, Photo]
    end

  end
end
