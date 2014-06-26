require 'test_helper'

class PhotoSetsControllerTest < ActionController::TestCase
  setup do
    sign_in_as(:ivan)
    @account = accounts(:st8998)

    @moment = create(:moment, photos: build_list(:photo, 3))
    @moment2 = create(:moment, photos: build_list(:photo, 3))
  end

  test 'show moment photo_set' do
    get :photos, key: "moment/#{@moment.id}", format: :json, account_key: accounts(:st8998).key

    response_json = JSON.parse(response.body)
    assert_response :success
    assert_api_response([{id: :integer}])
    assert_equal @moment.photos.size, response_json.size
  end

  test 'show "all" photo_set' do
    get :photos, key: 'all', format: :json, account_key: @account.key

    response_json = JSON.parse(response.body)
    assert_response :success
    assert_api_response([{id: :integer}])
    assert_equal @account.photos.size, response_json.size
  end
end
