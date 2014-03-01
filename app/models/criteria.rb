class Criteria < ActiveRecord::Base
  belongs_to :account

  def apply(scope)
    raise NotImplementedError, 'You should use more generic criteria instead'
  end
end
