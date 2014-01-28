require 'test_helper'

class PicturesTest < ActiveSupport::TestCase
  test 'factories' do
    p1 = create(:picture)
    p2 = create(:picture)
    p3 = create(:picture)

    assert p1.account.present?
    assert p2.account.present?
    assert p3.account.present?
    assert_equal p1.account, p2.account
    assert_equal p2.account, p3.account
  end
end
