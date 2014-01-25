require 'test_helper'

class PicturesSetTest < ActiveSupport::TestCase
  before do
    @p1 = Picture.create()
    @p2 = Picture.create()
    @p3 = Picture.create()
  end

  it 'ignore orderring without configuration' do
    order = [@p1.id, @p2.id, @p3.id].shuffle
    ps1 = PicturesSet.create(pictures: [@p1, @p2, @p3])

    ps1.pictures.ordered.to_a # wont raise any Exception
  end

  it 'provides correct pictures order' do
    order = [@p1.id, @p2.id, @p3.id].shuffle
    ps1 = PicturesSet.create(pictures: [@p1, @p2, @p3], configuration: {order: order})

    ps1.pictures.ordered.pluck(:id).must_equal order
  end
end