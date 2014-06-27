module Strategies::StrongParameters
  def attributes
    return @attributes if defined?(@attributes)

    @attributes = if options[:attributes]
      controller.send(options[:attributes])
    elsif controller.class.const_defined?(:PERMITTED_ATTRIBUTES, false)
      controller.params.require(name).permit(*controller.class::PERMITTED_ATTRIBUTES)
    else
      controller.params.require(name)
    end
  end

  ASSIGN_ATTRIBUTES_ACTIONS = %w[create update]

  def assign_attributes?
    singular? && controller.action_name.in?(ASSIGN_ATTRIBUTES_ACTIONS)
  end

  def resource
    super.tap do |r|
      r.attributes = attributes if assign_attributes?
    end
  end
end