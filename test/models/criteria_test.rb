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
    u1, u2, u3 = create_list(:user, 3)
    u4 = create(:user)

    base = User.where(id: [u1.id, u2.id, u3.id])

    c = build(:criteria_explicit)
    assert_equal [u1, u2, u3], c.apply(base).to_a, 'empty criteria'

    c.approve(u1.id)
    assert_equal [u1, u2, u3], c.apply(base).to_a, 'show all users plus approved u1'

    c.reject(u2.id)
    assert_equal [u1, u3], c.apply(base).to_a, 'show all users without rejected u2'

    c.reject(u3.id)
    assert_equal [u1], c.apply(base.all).to_a, 'show only u1'

    c.approve(u2.id)
    assert_equal [u1, u2], c.apply(base).to_a, 'show all users without rejected u3'
  end

  test 'Predicate criteria' do
    c = build(:criteria_predicate, column: 'test', value: 1)
    assert_scope_equal @test_model.where(:test.eq(1)), c.apply(@test_model.all), 'default (equal) predicate'

    c.predicate = 'not_eq'
    assert_scope_equal @test_model.where(:test.not_eq(1)), c.apply(@test_model.all), 'not equal predicate'

    c.predicate = 'unpermitted'
    assert_raises ArgumentError, 'unpermitted predicate' do
      c.apply(@test_model.all)
    end
  end

  test 'Criteria combination' do
    eq = build(:criteria_equal, column: 'test', value: 1)
    order = build(:criteria_order, column: 'test', direction: 'asc')

    assert_scope_equal @test_model.where(test: 1).order(:test.asc), order.apply(eq.apply(@test_model.all))
  end
end
