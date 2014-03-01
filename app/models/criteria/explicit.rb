class Criteria
  class Explicit < Criteria
    store_accessor :attrs, :column, :whitelist, :blacklist

    def apply(scope)
      scope = scope.where.not(column => blacklist) if blacklist.present?

      if whitelist.present?
        and_wheres = scope.where_values.presence || '1=1'
        scope = scope.unscope(:where).where(Arel::Nodes::Or.new(Arel::Nodes::And.new(and_wheres), scope.arel_table[column].in(whitelist)))
      end

      scope
    end

    def column
      (super || :id).to_sym
    end

    def approve(value)
      self.whitelist += [*value]
      self.blacklist -= [*value]
      attrs_will_change!
    end

    def reject(value)
      self.whitelist -= [*value]
      self.blacklist += [*value]
      attrs_will_change!
    end

    def approve!(value)
      approve(value)
      save!
    end

    def reject!(value)
      reject(value)
      save!
    end

    def whitelist
      self.whitelist = [] unless super.present?
      super
    end

    def blacklist
      self.blacklist = [] unless super.present?
      super
    end
  end
end