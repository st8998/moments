require 'test_helper'

class TemplatesControllerTest < ActionController::TestCase
  test 'accepts pictures upload' do
    get :template, path: '/directives/gallery'

    assert_response :success
  end
end