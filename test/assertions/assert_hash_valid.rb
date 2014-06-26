module MiniTest::Assertions
  def assert_hash_valid(validations, data, msg = nil)
    trafaret = Trafaret.construct(validations)

    validated = trafaret.call(data)

    msg = message(msg) { "Input doesn't conform validation rules: \n #{validations} \n Original hash: \n #{data}" }

    refute_kind_of(Trafaret::Error, validated, msg)
  end

  def assert_api_response(validations, msg = nil)
    assert_hash_valid(validations, JSON.parse(response.body), msg)
  end
end