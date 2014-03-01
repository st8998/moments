class Criteria
  class Explicit < Criteria
    store_accessor :attrs, :column, :whitelist, :blacklist

    def apply(scope)
      scope = scope.where(column => whitelist) if whitelist.present?

      scope = scope.where.not(column => blacklist) if blacklist.present?

      scope
    end

    def column
      (super || :id).to_sym
    end

    def approve(value)
      whitelist << value
      blacklist.delete(value)
    end

    def reject(value)
      whitelist.delete(value)
      blacklist << value
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