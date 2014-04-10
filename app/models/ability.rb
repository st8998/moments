class Ability
  include CanCan::Ability

  def initialize(account, user)

    can :read, Moment

    if account.present? && user.present? && account.id == user.account_id
      can :create, [Moment, Photo]

      can :manage, Moment, account_id: account.id
      can :manage, PhotoSet, account_id: account.id
      can :manage, Photo, account_id: account.id
    end

  end
end
