require 'test_helper'

class PlacesControllerTest < ActionController::TestCase
  setup do
    sign_in_as(:ivan)
    @account = accounts(:st8998)

    @p1 = create(:place, name: 'Name1')
    @p2 = create(:place, name: 'Name2')
    @p3 = create(:place, name: 'Name3')
  end

  test 'exact search is working' do
    get :search, term: 'Name1', account_key: accounts(:st8998).key, format: :json

    assert_equal 1, response_json.size
    assert_equal 'Name1', response_json.first['name']
  end

  def response_json
    JSON.parse(response.body)
  end
end
