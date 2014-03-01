require 'test_helper'

class PicturesSetTest < ActiveSupport::TestCase
  setup do
    @p1, @p2, @p3 = create_list(:picture, 3)
  end

  test 'get pictures from set' do
    c = create(:criteria_equal, column: 'id', value: @p1.id)
    ps = create(:pictures_set, criterias: [c])

    assert_equal [@p1], ps.pictures
  end

  test 'add picture to set' do
    p4 = create(:picture, account: accounts(:another_account))

    c = Criteria::Equal.new(column: 'id', value: @p1.id)

    ps = create(:pictures_set, criterias: [c])
    assert_equal [@p1], ps.pictures.to_a

    ps.add(@p2)
    assert_equal [@p1, @p2], ps.pictures.to_a

    ps.remove(@p1)
    assert_equal [@p2], ps.pictures.to_a

    ps.add(@p3)
    assert_equal [@p2, @p3], ps.pictures.to_a

    ps.add(p4)
    assert_equal [@p2, @p3], ps.pictures.to_a
  end
end