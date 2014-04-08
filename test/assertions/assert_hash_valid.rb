module MiniTest::Assertions
  def assert_hash_valid(validations, act, msg = nil)
    validator = HashValidator.validate(act, validations)

    msg = message(msg) { "Hash doesn't conform validation rules: \n #{validator.errors} \n Original hash: \n #{act}" }
    assert validator.valid?, msg
  end
end