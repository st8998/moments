require 'test_helper'

class AccountTest < ActiveSupport::TestCase
  test 'creating demo account' do
    a = Account.create_demo

    assert a.persisted?, 'should be correctly saved'
    assert a.key.present?, 'should have a key'
    assert a.demo, 'should be in demo mode'
  end
end
