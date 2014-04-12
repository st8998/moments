require 'test_helper'

class MomentsControllerTest < ActionController::TestCase
  setup do
    sign_in_as(:ivan)
  end

  def many(validation)
    HashValidator::Validations::Many.new(validation)
  end

  test 'create new moment' do
    photo1 = create(:photo)
    photo2 = create(:photo)

    moment_attrs = {
        description: 'some',
        photos: [photo1.id, photo2.id]
    }

    post :create, moment: moment_attrs, account_key: accounts(:st8998), format: :json

    moment = Moment.find(@controller.moment.id)

    assert_response :success
    assert_equal accounts(:st8998).id, moment.account_id
    assert_equal [photo1, photo2], moment.photos

    assert_hash_valid({id: 'integer', photos: many({'id' => [photo1.id, photo2.id]})}.deep_stringify_keys, JSON.parse(response.body))
  end

  test 'update moment' do
    photo1 = create(:photo)
    photo2 = create(:photo)
    moment = Moment.create(account_id: accounts(:st8998).id, photo_set: {photos: [photo1.id]})

    moment_attrs = {
        description: 'some',
        photos: [photo1.id, photo2.id]
    }

    put :update, moment: moment_attrs, id: moment.id, account_key: accounts(:st8998), format: :json

    moment = Moment.find(@controller.moment.id)

    assert_response :success
    assert_equal 'some', moment.description
    assert_equal [photo1, photo2], moment.photos

    assert_hash_valid({id: 'integer', photos: many({'id' => [photo1.id, photo2.id]})}.deep_stringify_keys, JSON.parse(response.body))
  end

  test 'delete moment' do
    moment = create(:moment)
    delete :destroy, id: moment.id, account_key: accounts(:st8998), format: :json

    assert_response :success
    assert_raises(ActiveRecord::RecordNotFound) { Moment.find(moment.id) }
  end

end
