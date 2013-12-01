class Moment < ActiveRecord::Base
  has_many :pictures, as: 'owner'
end
