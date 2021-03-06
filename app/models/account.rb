class Account < ActiveRecord::Base
  has_many :members, class_name: 'User'
  has_many :moments
  has_many :photos
  has_many :places
  has_many :tags

  def self.create_demo *attrs
    create(*attrs) do |model|
      model.demo = true
      model.key = model.uniq_key
    end
  end

  def uniq_key
    begin
      key = SecureRandom.hex(10)
    end while Account.exists?(key: key)
    key
  end

  def to_param
    key
  end
end
