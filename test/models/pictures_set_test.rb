require 'test_helper'

class PicturesSetTest < ActiveSupport::TestCase
  fixtures [:accounts, :users, :pictures_sets, :pictures_set_pictures, :pictures]

  before do
    @p1 = pictures(:picture1)
    @p2 = pictures(:picture2)
    @p3 = pictures(:picture3)

    @ps1 = pictures_sets(:pictures_set1)
  end

  it 'drain config attributes from pictures on save' do
    pics = [@p3, @p1, @p2].shuffle
    pics.each.with_index {|p, i| p.pos = i } # assign position
    ps2 = PicturesSet.create(pictures: pics)

    ps2.pictures_set_pictures.pluck(:pos).sort.must_equal [0,1,2]
    ps2.pictures.pluck(:id).must_equal pics.map(&:id)
  end

  it 'assigns virtual attributes to picture' do
    ps2 = PicturesSet.create(
        pictures_set_pictures: [
            PicturesSetPicture.new(picture: @p1, th_width: 10, pos: 3),
            PicturesSetPicture.new(picture: @p2, th_width: 20, pos: 1),
            PicturesSetPicture.new(picture: @p3, th_width: 30, pos: 2)
        ]
    )

    pics = ps2.pictures(true)

    pics.map(&:th_width).must_equal [20, 30, 10]
    pics.map(&:pos).must_equal [1, 2, 3]
  end
end