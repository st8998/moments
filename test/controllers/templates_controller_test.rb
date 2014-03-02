require 'test_helper'

class TemplatesControllerTest < ActionController::TestCase
  setup do
    TemplatesController.send(:prepend_view_path, data_root)
    @test_template = File.new("#{data_root}/test_template.html.slim")
  end

  test 'accepts pictures upload' do
    get :template, path: '/test_template.html.slim'

    assert_response :success
    assert_equal @test_template.mtime.httpdate, response.header['Last-Modified']
  end

  test 'correct cache headers' do
    @request.env['HTTP_IF_MODIFIED_SINCE'] = @test_template.mtime.httpdate
    get :template, path: '/test_template.html.slim'

    assert_response 304

    @request.env['HTTP_IF_MODIFIED_SINCE'] = 1.minute.ago(@test_template.mtime).httpdate
    get :template, path: '/test_template.html.slim'

    assert_response 200
  end
end
