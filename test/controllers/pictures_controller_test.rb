require 'test_helper'

class PicturesControllerTest < ActionController::TestCase
  setup do
    sign_in_as(:ivan)
  end

  test 'accepts pictures upload' do
    post :upload, account_key: accounts(:st8998).key, image: Rails.root.join('test/data/testpic.jpg'), format: :json

    assert_response :success
    assert_template :picture
    #assert_not_nil @controller.picture.image
  end

  test 'prevents upload from another account' do
    post :upload, account_key: accounts(:another_account).key, image: Rails.root.join('test/data/testpic.jpg'), format: :json

    assert_response 403
  end
end