require 'test_helper'

class MomentTest < ActiveSupport::TestCase
  test 'create nested PhotoSet' do
    m = Moment.create(photo_set: {key: 'key'})
    m.reload

    assert m.persisted?
    assert m.photo_set.persisted?
    assert_equal 'key', m.photo_set.key

    m.update_attributes(photo_set: {_destroy: true, id: m.photo_set.id})
    m.reload

    assert_nil m.photo_set
  end
end
