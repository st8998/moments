module EnhancedNestedAttributes
  def accepts_nested_attributes_for(*attr_names)
    super

    attr_names.extract_options!

    attr_names.each do |name|
      association = self.reflect_on_association(name)
      class_name = association.class_name

      if association.macro == :has_one
        class_eval <<-RUBY, __FILE__, __LINE__+1
          def #{name}= attrs
            if attrs.is_a?(Hash) && attrs[:id]
              self.#{name} = #{class_name}.find(attrs[:id])
              self.#{name}_attributes = attrs
            elsif attrs.is_a?(#{class_name})
              super
            else
              self.#{name}_attributes = attrs
            end
          end
        RUBY
      else
        class_eval <<-RUBY, __FILE__, __LINE__+1
          def #{name}= attrs
            if attrs.first && attrs.first.is_a?(#{class_name})
              super
            else
              self.#{name}_attributes = attrs
            end
          end
        RUBY
      end
    end
  end
end