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

  test 'upload to another account' do
    post :create, photo: {image: data_root.join('ass.jpg').open, description: 'some'}, account_key: accounts(:another_account).key, format: :json
    assert_response :forbidden
  end

  test 'upload without account' do
    @controller.stubs(:current_user).returns(nil) # logout
    post :create, photo: {image: data_root.join('ass.jpg').open, description: 'some'}, account_key: accounts(:another_account).key, format: :json
    assert_response :forbidden
  end

  test 'delete photo' do
    photo = Photo.create(account: accounts(:st8998))

    delete :destroy, id: photo.id, account_key: accounts(:st8998).key, format: :json
    assert_response :success
    assert_raises(ActiveRecord::RecordNotFound) { Photo.find(photo.id) }
  end

  test 'delete photo from another account' do
    photo = Photo.create(account: accounts(:another_account))
    delete :destroy, id: photo.id, account_key: accounts(:st8998).key, format: :json
    assert_response :not_found
  end

  test 'update photo' do
    photo = Photo.create(account: accounts(:st8998))

    put :update, id: photo.id, photo: {description: 'new desc'}, account_key: accounts(:st8998).key, format: :json
    assert_response :success

    assert_equal 'new desc', Photo.find(photo.id).description
    body = JSON.parse(response.body)
    assert_equal('new desc', body['description'])
    assert_hash_valid({id: 'integer', description: 'string'}.stringify_keys, body)
  end

  test 'update photo from another account' do
    photo = Photo.create(account: accounts(:another_account))
    put :update, id: photo.id, photo: {description: 'new desc'}, account_key: accounts(:st8998).key, format: :json
    assert_response :not_found
  end
end