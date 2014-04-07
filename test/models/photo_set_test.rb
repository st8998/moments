require 'test_helper'

class PhotoSetTest < ActiveSupport::TestCase
  setup do
    @p1, @p2, @p3 = create_list(:photo, 3)
  end

  test 'get photos from set' do
    c = create(:criteria_equal, column: 'id', value: [@p1.id, @p2.id])
    ps = create(:photo_set, criterias: [c])

    assert_equal [@p1, @p2], ps.photos
  end

  test 'add photo to set' do
    p4 = create(:photo, account: accounts(:another_account))

    c = Criteria::Equal.new(column: 'id', value: @p1.id)

    ps = create(:photo_set, criterias: [c])
    assert_equal [@p1], ps.photos.to_a

    ps.add(@p2)
    assert_equal [@p1, @p2], ps.photos.to_a

    ps.remove(@p1)
    assert_equal [@p2], ps.photos.to_a

    ps.add([@p3.id, p4])
    assert_equal [@p2, @p3], ps.photos.to_a
  end
end