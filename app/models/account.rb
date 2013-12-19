class Account < ActiveRecord::Base
  has_many :members, class_name: 'User'
  has_many :pictures
end
