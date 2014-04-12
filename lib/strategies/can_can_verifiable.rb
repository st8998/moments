module Strategies::CanCanVerifiable
  def model
    super.accessible_by(controller.current_ability)
  end
end