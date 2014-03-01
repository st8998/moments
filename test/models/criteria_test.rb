require 'test_helper'

class CriteriaTest < ActiveSupport::TestCase
  setup do
    @test_model = Class.new(ActiveRecord::Base)
  end

  test 'criteria should preserve attrs type' do
    c = create(:criteria, attrs: {fixnum: 12, array: [1, 2, 3], boolean: true})

    assert_instance_of Fixnum, c.attrs['fixnum'], 'fixnum'
    assert_instance_of Array, c.attrs['array'], 'array'
    assert_instance_of TrueClass, c.attrs['boolean'], 'boolean'
  end

  test 'Equal criteria' do
    c = build(:criteria_equal, column: 'test', value: 1, negative: false)
    assert_scope_equal @test_model.where(test: 1), c.apply(@test_model.all), 'positive scope'

    c.assign_attributes(negative: true)
    assert_scope_equal @test_model.where.not(test: 1), c.apply(@test_model.all), 'negative scope'
  end

  test 'Order criteria' do
    c = build(:criteria_order, column: 'test', direction: 'asc')
    assert_scope_equal @test_model.order(:test.asc), c.apply(@test_model.all), 'asc direction'

    c.assign_attributes(direction: 'desc')
    assert_scope_equal @test_model.order(:test.desc), c.apply(@test_model.all), 'desc direction'

    c.assign_attributes(direction: nil)
    assert_scope_equal @test_model.order(:test.asc), c.apply(@test_model.all), 'default (asc) direction'
  end

  test 'Explicit criteria' do
    c = build(:criteria_explicit)
    assert_scope_equal @test_model.all, c.apply(@test_model.all), 'empty criteria'

    c.approve(1)
    assert_scope_equal @test_model.where(id: [1]), c.apply(@test_model.all), 'approve 1'

    c.approve(2)
    c.reject(1)
    assert_scope_equal @test_model.where(id: [2]).where.not(id: [1]), c.apply(@test_model.all), 'approve 2 reject 1'

    c.reject(2)
    assert_scope_equal @test_model.where.not(id: [1, 2]), c.apply(@test_model.all), 'reject 1, 2'
  end

  test 'Criteria combination' do
    eq = build(:criteria_equal, column: 'test', value: 1)
    order = build(:criteria_order, column: 'test', direction: 'asc')

    assert_scope_equal @test_model.where(test: 1).order(:test.asc), order.apply(eq.apply(@test_model.all))
  end
end
