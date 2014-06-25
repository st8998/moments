require 'test_helper'

class PhotoSetsControllerTest < ActionController::TestCase
  setup do
    sign_in_as(:ivan)
  end

  test 'show moment photoset' do
    skip
    moment = create(:moment, photos: build_list(:photo, 3))

    get :show, key: "moment/#{moment.id}", format: :json

    assert_response :success
  end
end
