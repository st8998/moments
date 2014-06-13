class ApplicationSerializer < ActiveModel::Serializer

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

  SERIALIZER_MTIME = 12

  def cache_key
    [scope.user, Ability::MTIME, object, self.class::SERIALIZER_MTIME]
  end
end