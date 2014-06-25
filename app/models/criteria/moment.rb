class Criteria
  class Moment < Criteria
    store_accessor :attrs, :moment_id

    def apply(scope)
      root = Moment.find(moment_id)
      root = root.parent_id? ? root.parent : root

      sub_moments = root.sub_moments

      scope.where(moment_id: [root.id, *sub_moments.pluck(:id)]).order(:moment_id, :date)
    end
  end
end