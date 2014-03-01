class Criteria
  class Equal < Criteria
    store_accessor :attrs, :column, :value, :negative

    def apply(scope)
      if negative
        scope.where.not(column => value)
      else
        scope.where(column => value)
      end
    end
  end
end