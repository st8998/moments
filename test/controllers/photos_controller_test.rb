require 'test_helper'

class PhotosControllerTest < ActionController::TestCase

  setup do
    sign_in_as(:ivan)
  end

  test 'increase views count' do
    photo = create(:photo)
    post :increase_views_count, id: photo.id, account_key: accounts(:st8998).key, format: :json
    post :increase_views_count, id: photo.id, account_key: accounts(:st8998).key, format: :json

    assert_response :success
    assert_equal 2, photo.reload.views_count
  end

  test 'correct serializer' do
    post :create, photo: {image: data_root.join('lenin.jpg').open, description: 'some'}, account_key: accounts(:st8998).key, format: :json

    assert_response :success
    assert_api_response({id: :integer, image_url_512: :string, tags: [{id: :integer, name: :string}]})
  end

  test 'should upload photo' do
    post :create, photo: {image: data_root.join('ass.jpg').open, description: 'some'}, account_key: accounts(:st8998).key, format: :json

    assert_response :success

    assert_equal accounts(:st8998).id, @controller.photo.account_id
    assert_equal 'some', @controller.photo.description
    assert @controller.photo.image.present?

    assert_api_response({id: :integer, image_url_512: :string})
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
    photo = create(:photo)

    delete :destroy, id: photo.id, account_key: accounts(:st8998).key, format: :json
    assert_response :success
    assert_raises(ActiveRecord::RecordNotFound) { Photo.find(photo.id) }
  end

  test 'delete photo from another account' do
    photo = create(:photo, account: accounts(:another_account))
    delete :destroy, id: photo.id, account_key: accounts(:st8998).key, format: :json
    assert_response :not_found
  end

  test 'update photo' do
    photo = create(:photo)

    put :update, id: photo.id, photo: {description: 'new desc'}, account_key: accounts(:st8998).key, format: :json
    assert_response :success

    assert_equal 'new desc', Photo.find(photo.id).description
    body = JSON.parse(response.body)
    assert_equal('new desc', body['description'])
    assert_api_response({id: :integer, description: :string})
  end

  test 'update photo from another account' do
    photo = create(:photo, account: accounts(:another_account))
    put :update, id: photo.id, photo: {description: 'new desc'}, account_key: accounts(:st8998).key, format: :json
    assert_response :not_found
  end

  test 'update photo with forbidden attributes' do
    photo = create(:photo)
    put :update, id: photo.id, photo: {dummy_attribute: 'dummy'}, account_key: accounts(:st8998).key, format: :json
    assert_response :success
  end
end