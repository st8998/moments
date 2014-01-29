require 'test_helper'

class PicturesSetTest < ActiveSupport::TestCase
  setup do
    @ps1 = create(:pictures_set)
    @p1, @p2, @p3 = create_list(:picture, 3)
  end

  test 'drain config attributes from pictures on save' do
    pics = [@p3, @p1, @p2].shuffle
    pics.each.with_index {|p, i| p.pos = i } # assign position
    ps2 = create(:pictures_set, pictures: pics)

    assert_equal [0,1,2], ps2.pictures_set_pictures.pluck(:pos).sort
    assert_equal pics.map(&:id), ps2.pictures.pluck(:id)
  end

  test 'assigns virtual attributes to picture' do
    ps2 = PicturesSet.create(
        pictures_set_pictures: [
            PicturesSetPicture.new(picture: @p1, th_width: 10, pos: 3),
            PicturesSetPicture.new(picture: @p2, th_width: 20, pos: 1),
            PicturesSetPicture.new(picture: @p3, th_width: 30, pos: 2)
        ]
    )

    pics = ps2.pictures(true)

    assert_equal [20, 30, 10], pics.map(&:th_width), 'width fetched'
    assert_equal [1, 2, 3], pics.map(&:pos), 'proper order'
  end
end