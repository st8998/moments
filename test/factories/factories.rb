class FactoryGirl::SyntaxRunner
  def identify(name)
    ActiveRecord::FixtureSet.identify(name)
  end

  def accounts(name)
    Account.find(identify(name))
  end
end

FactoryGirl.define do
  # assume we have account fixtures loaded
  trait :with_account do
    account { accounts(:st8998) }
  end

  factory :picture, traits: [:with_account]

  factory :pictures_set, traits: [:with_account] do
    ignore do
      pictures_count 0
    end

    pictures { build_list(:picture, pictures_count) }
  end

  factory :criteria, traits: [:with_account] do
    factory :criteria_equal, class: Criteria::Equal
    factory :criteria_order, class: Criteria::Order
    factory :criteria_explicit, class: Criteria::Explicit
  end
end