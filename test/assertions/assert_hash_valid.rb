module MiniTest::Assertions
  def assert_hash_valid(validations, data, msg = nil)
    trafaret = Trafaret.construct(validations)

    validated = trafaret.call(data)

    msg = message(msg) { "Hash doesn't conform validation rules: \n #{validated} \n Original hash: \n #{data}" }
    assert_kind_of(Hash, validated, msg)
  end

  def assert_api_response(validations, msg = nil)
    assert_hash_valid(validations, JSON.parse(response.body), msg)
  end
end