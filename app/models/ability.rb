class Ability
  include CanCan::Ability

  def initialize(account, user)

    can :read, [Moment, Photo], account_id: account.id

    if user.present?
      if user.account_id == account.id
        can :create, [Moment, Photo], account_id: account.id
      end

      can [:update, :delete], Moment, account_id: user.account_id
      can [:update, :delete], Photo, account_id: user.account_id
    end

  end
end
