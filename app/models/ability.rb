class Ability
  include CanCan::Ability

  def initialize(account, user)
    @user = user

    can :read, [Moment, Photo], account_id: account.id

    if user.present?
      if user.account_id == account.id
        can :create, [Moment, Photo], account_id: account.id
      end

      can [:update, :delete], Moment, account_id: user.account_id
      can [:create_sub_moment], Moment, account_id: user.account_id
      can [:update, :delete], Photo, account_id: user.account_id
    end
  end

  def user
    @user
  end

  MTIME = File.new(__FILE__).mtime
end
