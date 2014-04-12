module MiniTest::Assertions
  def assert_hash_valid(validations, act, msg = nil)
    validator = HashValidator.validate(act, validations)

    msg = message(msg) { "Hash doesn't conform validation rules: \n #{validator.errors} \n Original hash: \n #{act}" }
    assert(validator.valid?, msg)
  end

  def assert_api_response(validations, msg = nil)
    validations.deep_stringify_keys! if validations.respond_to?(:deep_stringify_keys!)

    assert_hash_valid(validations, JSON.parse(response.body), msg)
  end
end