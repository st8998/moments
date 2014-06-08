require 'test_helper'

class MomentsControllerTest < ActionController::TestCase
  setup do
    sign_in_as(:ivan)
  end

  test 'create new moment' do
    photo1 = create(:photo)
    photo2 = create(:photo)

    moment_attrs = {
        description: 'some',
        photos: [{id: photo1.id}, {id: photo2.id}]
    }

    post :create, moment: moment_attrs, account_key: accounts(:st8998), format: :json

    moment = Moment.find(@controller.moment.id)

    assert_response :success
    assert_equal accounts(:st8998).id, moment.account_id
    assert_equal [photo1, photo2], moment.photos

    assert_api_response({id: :integer, photos: [{id: :integer}]})
  end

  test 'update moment' do
    photo1 = create(:photo)
    photo2 = create(:photo)
    moment = Moment.create(account_id: accounts(:st8998).id, photos: [photo1])

    moment_attrs = {
        description: 'some',
        photos: [{id: photo1.id}, {id: photo2.id}]
    }

    put :update, moment: moment_attrs, id: moment.id, account_key: accounts(:st8998), format: :json

    moment = Moment.find(@controller.moment.id)

    assert_response :success
    assert_equal 'some', moment.description
    assert_equal [photo1, photo2], moment.photos

    assert_api_response({id: :integer, photos: [{id: :integer}]})
  end

  test 'delete moment' do
    moment = create(:moment)
    delete :destroy, id: moment.id, account_key: accounts(:st8998), format: :json

    assert_response :success
    assert_raises(ActiveRecord::RecordNotFound) { Moment.find(moment.id) }
  end

  test 'moments index' do
    photos = create_list(:photo, 1)
    moment = create(:moment, photos: photos)

    get :index, account_key: accounts(:st8998), format: :json
    assert_response :success

    body = JSON.parse(response.body)
    assert_kind_of(Array, body)
    assert_hash_valid({id: :integer}, body.first)
  end

  test 'moments index from another account' do
    photos = create_list(:photo, 1)
    moment = create(:moment, photos: photos)

    get :index, account_key: accounts(:another_account), format: :json
    assert_response :success

    body = JSON.parse(response.body)
    assert_equal [], body
  end
end
