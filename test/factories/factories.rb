FactoryGirl.define do

  # assume we have account fistures loaded
  trait :with_account do
    account { Account.find(ActiveRecord::FixtureSet.identify(:st8998)) }
  end

  factory :picture, traits: [:with_account]

  factory :pictures_set, traits: [:with_account] do
    ignore do
      pictures_count 0
    end

    pictures { build_list(:picture, pictures_count) }
  end
end