require 'test_helper'

class PicturesControllerTest < ActionController::TestCase

  fixtures [:accounts, :users]

  setup do
    ApplicationController.any_instance.stubs(:current_user).returns(users(:ivan))
  end

  test 'accepts pictures upload' do
    post :upload, account_key: accounts(:st8998).key, image: Rails.root.join('test/data/testpic.jpg'), format: :json

    assert_response :success
    assert_template :picture
    assert_not_nil @controller.picture.image
  end

  test 'prevents upload from another account' do
    post :upload, account_key: accounts(:another_account).key, image: Rails.root.join('test/data/testpic.jpg'), format: :json

    assert_response 403
  end
end