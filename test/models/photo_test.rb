require 'test_helper'

class PhotoTest < ActiveSupport::TestCase
  test 'factories' do
    p1 = create(:photo)
    p2 = create(:photo)
    p3 = create(:photo)

    assert p1.account.present?
    assert p2.account.present?
    assert p3.account.present?
    assert_equal p1.account, p2.account
    assert_equal p2.account, p3.account
  end

  test 'missing metadata' do
    create(:photo, image: File.new(data_root.join('ass.jpg')))
  end

  test 'fetching metadata' do
    p = create(:photo, image: File.new(data_root.join('lenin.jpg')))

    assert_equal 64, p.width, 'width'
    assert_equal 64, p.height, 'height'

    assert_equal DateTime.parse('08/02/2014 15:30:15'), p.date, 'date'
    assert_equal 320, p.iso, 'iso'
    assert_equal 63, p.focal_length, 'focal_length'
    assert_equal 4.5, p.aperture_value, 'aperture_value'
    assert_equal '1/80', p.exposure_time, 'exposure_time'
    assert_equal ['lenin', 'samara'], p.keywords, 'keywords'
  end

  test 'analyse metadata only if image present and changed' do
    begin
      create(:photo)
    rescue NoMethodError
      assert(false, 'should not analyse without image')
    end

    p = create(:photo, image: File.new(data_root.join('lenin.jpg')))
    assert_equal 64, p.width, 'analyse if image present'
  end
end
