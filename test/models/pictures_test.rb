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

  test 'missing metadata' do
    create(:picture, image: File.new(data_root.join('ass.jpg')))
  end

  test 'fetching metadata' do
    p = create(:picture, image: File.new(data_root.join('lenin.jpg')))

    assert_equal 64, p.width, 'width'
    assert_equal 64, p.height, 'height'

    assert_equal 320, p.iso, 'iso'
    assert_equal 63, p.focal_length, 'focal_length'
    assert_equal 4.5, p.aperture_value, 'aperture_value'
    assert_equal '1/80', p.exposure_time, 'exposure_time'
    assert_equal ['lenin', 'samara'], p.keywords, 'keywords'
  end

  test 'analyse metadata only if image present and changed' do
    begin
      create(:picture)
    rescue NoMethodError
      assert(false, 'should not analyse without image')
    end

    p = create(:picture, image: File.new(data_root.join('lenin.jpg')))
    assert_equal 64, p.width, 'analyse if image present'
  end

end
