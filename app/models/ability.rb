class Ability
  include CanCan::Ability

  def initialize(account)

    if account.demo?
      can :manage, Picture, account_id: account.id
    end

  end
end
