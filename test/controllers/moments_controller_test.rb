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
        photos: [{id: photo1.id}, {id: photo2.id}],
        date: '11/05/2014 11:33'
    }

    post :create, moment: moment_attrs, account_key: accounts(:st8998), format: :json

    moment = Moment.find(@controller.moment.id)

    assert_response :success
    assert_equal accounts(:st8998).id, moment.account_id
    assert_equal [photo1, photo2], moment.photos
    assert_equal users(:ivan), moment.author
    assert_equal DateTime.parse('11/05/2014 11:33'), moment.date

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

  test 'moments index pagination' do
    MomentsController::PER_PAGE = 5
    date = '11/11/2014 11:11'
    moments = create_list(:moment, 10, date: date).reverse

    get :index, account_key: accounts(:st8998), format: :json
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal 5, body.size
    assert_equal moments[0..4].map(&:id), body.map {|m| m['id']}

    get :index, from_date: date, from_id: moments[1]['id'], account_key: accounts(:st8998), format: :json
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal 5, body.size
    assert_equal moments[2..6].map(&:id), body.map {|m| m['id']}

    get :index, from_date: date, from_id: moments[3]['id'], account_key: accounts(:st8998), format: :json
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal 5, body.size
    assert_equal moments[4..8].map(&:id), body.map {|m| m['id']}
  end
end
