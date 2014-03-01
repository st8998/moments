class Criteria < ActiveRecord::Base
  belongs_to :account
  belongs_to :owner, polymorphic: true

  def apply(scope)
    raise NotImplementedError, 'You should use more generic criteria instead'
  end
end
