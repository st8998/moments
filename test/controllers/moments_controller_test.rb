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
        photo_set: {
            criterias: [{type: 'Criteria::Equal', column: 'id', value: '0'}, {type: 'Criteria::Explicit', whitelist: [photo1.id, photo2.id]}]
        }
    }

    post :create, moment: moment_attrs, account_key: accounts(:st8998), format: :json

    moment = Moment.find(@controller.moment.id)

    assert_response :success
    assert_equal accounts(:st8998).id, moment.account_id

    assert_equal accounts(:st8998).id, moment.photo_set.account_id

    assert_equal [photo1, photo2], moment.photo_set.photos

    assert_hash_valid({id: 'integer', photo_set: {id: 'integer'}}.deep_stringify_keys, JSON.parse(response.body))
  end

end
