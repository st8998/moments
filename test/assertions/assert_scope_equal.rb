module MiniTest::Assertions
  def assert_scope_equal(exp, act, msg = nil)
    msg = message(msg) { "Where values don\'t match\n #{diff(exp.where_values_hash, act.where_values_hash)}" }
    assert exp.where_values == act.where_values, msg

    msg = message(msg) { "Order values don\'t match\n #{diff(exp.order_values_hash, act.order_values_hash)}" }
    assert exp.order_values == act.order_values, msg
  end
end