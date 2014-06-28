class ApplicationSerializer < ActiveModel::Serializer

  def class_name
    object.class.name
  end

  def self.security_attributes *attrs
    attributes *attrs.map {|attr| :"can_#{attr}"}

    attrs.each do |attr|
      class_eval <<-RUBY, __FILE__, __LINE__+1
        def can_#{attr}
          scope.can?(:#{attr}, object)
        end
      RUBY
    end
  end

  def cache_key
    [scope.user, Ability::MTIME, object, self.class::SERIALIZER_MTIME]
  end
end