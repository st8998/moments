require 'test_helper'

class PlacesControllerTest < ActionController::TestCase
  setup do
    sign_in_as(:ivan)
    @account = accounts(:st8998)

    @p1 = create(:place, name: 'Name1')
    @p2 = create(:place, name: 'Name2')
    @p3 = create(:place, name: 'Name3')
    @p4 = create(:place, name: 'Nona1')
  end

  test 'exact search is working' do
    get :search, term: 'Name1', account_key: accounts(:st8998).key, format: :json

    assert_equal 1, response_json.size
    assert_equal 'Name1', response_json.first['name']
  end

  test 'part name search is working' do
    get :search, term: 'Na', account_key: accounts(:st8998).key, format: :json

    assert_equal 3, response_json.size
  end

  test 'searching with errors' do
    get :search, term: 'Nmae', account_key: accounts(:st8998).key, format: :json

    assert_equal 3, response_json.size
  end

  def response_json
    JSON.parse(response.body)
  end
end
