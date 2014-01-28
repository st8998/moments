FactoryGirl.define do

  # assume we have account fistures loaded
  trait :with_account do
    account { Account.find_by(key: 'st8998') }
  end

  factory :picture, traits: [:with_account]
end