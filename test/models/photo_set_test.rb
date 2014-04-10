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

  test 'assign nested criterias' do
    ps = PhotoSet.create(criterias: [{type: 'Criteria::Equal'}])
    ps.reload

    assert ps.persisted?
    assert_equal 1, ps.criterias.count

    c = ps.criterias.first
    ps.update_attributes(criterias: [{id: c.id, _destroy: true}])
    ps.reload

    assert_equal 0, ps.criterias.count
    assert_nil Criteria.find_by(id: c.id)

    c2 = Criteria::Equal.create

    ps.update_attributes(criterias: [{id: c2.id}])
    ps.reload

    assert_equal 1, ps.criterias.count
  end
end