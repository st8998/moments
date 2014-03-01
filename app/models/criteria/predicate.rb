class Criteria
  class Predicate < Criteria
    store_accessor :attrs, :column, :value, :predicate

    PERMITED_PREDICATES = %w{eq not_eq gt lt in not_in}
    validates :predicate, inclusion: { in: PERMITED_PREDICATES }

    def apply(scope)
      raise(ArgumentError.new("Unpermitted predicate, use one of #{PERMITED_PREDICATES.join(',')}")) unless valid?
      scope.where(column.send(predicate, value))
    end

    def column
      super.to_sym
    end

    def predicate
      super || 'eq'
    end
  end
end