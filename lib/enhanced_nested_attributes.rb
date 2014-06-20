module EnhancedNestedAttributes
  def accepts_nested_attributes_for(*attr_names)
    super

    attr_names.extract_options!

    attr_names.each do |name|
      association = self.reflect_on_association(name)
      class_name = association.class_name

      case association.macro
      when :has_one, :belongs_to
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
      when :has_many
        class_eval <<-RUBY, __FILE__, __LINE__+1
          def #{name}= arr
            associated_models = []
            associated_attrs = []

            arr.each do |attrs|
              if attrs.is_a?(Hash) && attrs[:id]
                model = #{class_name}.find(attrs[:id])
                associated_models.push(model)
                associated_attrs.push(attrs)
              elsif attrs.is_a?(#{class_name})
                associated_models.push(attrs)
              else
                associated_attrs.push(attrs)
              end
            end

            super(associated_models) if associated_models.present?
            self.#{name}_attributes = associated_attrs if associated_attrs.present?
          end
        RUBY
      else
        raise "Unsupported association type #{association.macro}."
      end
    end
  end
end