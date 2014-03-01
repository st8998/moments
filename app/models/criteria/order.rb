class Criteria
  class Order < Criteria
    store_accessor :attrs, :column, :direction

    def apply(scope)
      scope.order(column.send(direction))
    end

    def column
      super.to_sym
    end

    def direction
      (super || :asc).to_sym
    end
  end
end