require 'test_helper'

class PhotosControllerTest < ActionController::TestCase

  setup do
    sign_in_as(:ivan)
  end

  test 'should upload photo' do
    post :create, photo: {image: data_root.join('ass.jpg').open, description: 'some'}, account_key: accounts(:st8998).key, format: :json

    assert_response :success
    assert_template :photo

    assert_equal accounts(:st8998).id, @controller.photo.account_id
    assert_equal 'some', @controller.photo.description
    assert @controller.photo.image.present?

    assert_hash_valid({id: 'integer', image_url_small: 'string'}.stringify_keys, JSON.parse(response.body))
  end

end