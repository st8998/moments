require 'test_helper'

class PicturesControllerTest < ActionController::TestCase

  before do
    @account = Account.create(key: SecureRandom.hex(10))
    @user = @account.members.create
    ApplicationController.any_instance.stubs(:current_user).returns(@user)
  end

  it 'accepts pictures upload' do
    post :upload, account_key: @account.key, image: Rails.root.join('test/data/testpic.jpg'), format: :json

    assert_response :success
    assert_template :picture
    assert_not_nil @controller.picture.image
  end

  it 'prevents upload from another account' do
    another_account = Account.create(key: SecureRandom.hex(10))

    post :upload, account_key: another_account.key, image: Rails.root.join('test/data/testpic.jpg'), format: :json

    assert_response 403
  end
end